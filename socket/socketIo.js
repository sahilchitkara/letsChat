var Location=require('./../model/location');

exports = module.exports = function() {
  var that = this;

  function getRoomData(){
    var roomArr=[];
    var rooms=io.sockets.manager.rooms;
    delete rooms[''];
    for( var i in rooms){
      var length=rooms[i].length;
      roomArr.push({name:i,count:length})
    }
    return roomArr;
  }
  io.sockets.on('connection',function(socket) {
    console.log("socket.io connected");
    socket.on("joinRoom",function(name) {
      socket.join(name);
      Location.update({name:name},{ $inc: { userCount: 1 }},function(err,res){
        if(err){
          console.log(err);
          console.log("error saving count in location");
        }else{
          io.sockets.emit('socketUsersChange',"hiii");
        }
      });
    });
    socket.on("leaveRoom",function(name) {
      socket.leave(name);
      Location.findOne({name:name},function(err,resp){
        if(err){
          console.log("error getting location");
        }else{
          Location.update({name:name},{ $set: { userCount: resp.userCount-1 }},function(err,res){
            if(err){
              console.log("error saving count in location");
            }else{
              io.sockets.emit('socketUsersChange',"hello");
            }
          });
        }
      })
    });

    socket.on("chat",function(data,user) {
      io.sockets.in(user.location).emit('message',data,user);
    });
  });
};
