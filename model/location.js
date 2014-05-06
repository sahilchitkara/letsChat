var mongoose = require('mongoose')

// Schema
var LocationSchema = mongoose.Schema({
  name: { type: String,required: true },
  userCount: {type: Number,default: 0}
},{ autoIndex: true,collection: 'location' });

// Export Model
module.exports = mongoose.model('Location',LocationSchema);
