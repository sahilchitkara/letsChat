var mongoose = require('mongoose')

// Schema
var UserSchema = mongoose.Schema({
  name : { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }}
}, { autoIndex : true, collection : 'users' });

// Export Model
module.exports = mongoose.model('User', UserSchema);
