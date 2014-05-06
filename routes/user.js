var User=require('./../model/user');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res){
  User.findOne({email:req.body.user.email},function(err,user){
    if(err) res.send({status:'Error'});
    if(!user){
      console.log("no user Found,creating user");
      User.create({ email: req.body.user.email, name: req.body.user.name },function(err,user){
        if(err) res.send({status:'Error'});
        else{
          res.send({status:"success",msg:"chat",userDetails:{user:user,location:req.body.user.location}});
        }
      });
    }else{
      req.login(user, function(err) {
        if (err) { console.log(err);return next(err); }
        return res.send({status:"success",msg:"chat",userDetails:{user:user,location:req.body.user.location}});
      })
    }
  })
};
