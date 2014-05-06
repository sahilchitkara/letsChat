var passport = require('passport')
  , User = require('./../model/user');

/*
exports.AuthorizeGoogleLogin = function(userProfile,callback) {
  User.findOrCreate({email: userProfile.emails[0].value},{email: userProfile.emails[0].value,firtsName: userProfile.name.givenName,lastName: userProfile.name.familyName,googleId: userProfile.id,isActive: true}).success(function(user,created) {
    callback(null,user.dataValues);
  });
};*/
