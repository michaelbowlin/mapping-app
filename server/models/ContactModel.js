var mongoose = require('mongoose');


var contactSchema = mongoose.Schema({
  contactName: {type: String},
  contactEmail: {type: String}
});

var Contact = mongoose.model('Contact', contactSchema);