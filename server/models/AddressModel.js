var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
  street: {type: String},
  city: {type: String},
  state: {type: String},
  zipCode: {type: Number}
});

//exports.addressSchema = addressSchema;
var Address = mongoose.model('Address', addressSchema);