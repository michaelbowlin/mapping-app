var mongoose = require('mongoose'),
    contactSchema = require('./ContactModel.js');

var billingSchema = mongoose.Schema({
  accountType: {type: String},
  accountContact: [contactSchema]
});

//exports.billingSchema = billingSchema;
var Billing = mongoose.model('Billing', billingSchema);