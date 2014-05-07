var Location=require('./../model/location');
/*
 * GET users listing.
 */

exports.listLocations = function(req, res){
  Location.find(function(err,location){
    if(err){
      console.log("error getting location",err);
    }else{
      res.send(location);
    }
  });
};

exports.createLocation=function(req,res,next){
  Location.findOne({name:req.body.user.location},function(err,location){
    if(err) res.send({status:'Error'});
    if(!location){
      console.log("no location Found,creating location");
      Location.create({ name: req.body.user.location },function(err,locationData){
        if(err) res.send({status:'Error'});
        else{
          next();
        }
      });
    }else{
     next();
    }
  })
}
