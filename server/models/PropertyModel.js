var mongoose = require('mongoose'),
    addressSchema = require('./AddressModel.js');

var propertySchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!', default:'New Property'},
  productType: {type: String},
  propertyType: {type: String},
  dateAdded: {type: Date, required:'{PATH} is required!', default: Date.now()},
  dateComplete: {type: Date, required:'{PATH} is required!', default: Date.now()},
  address: [ addressSchema ],
  latCoord: {type: Number},
  longCoord: {type: Number},
  // description: {type: String},  
  imporvementSize: {type: String},
  imporvementSizeMultiFamily: {type: String},
  state: {type: String},
  // improvementSizeType: {type: String, default: "Acres"},
  landSize: {type: Number},
  relevantCondition: {type: String},
  propertyType: {type: String, required:'{PATH} is required!', default: 'Commercial'},
  userAccount: {type: String}
});


var Property = mongoose.model('Property', propertySchema);

function createDefaultProperties() {
  Property.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Property.create({
        title: "Colorado Capital",
        productType: "Appraisal",
        latCoord: 39.7394199,
        longCoord: -104.9847909,
        landSize: 5,
        description: "Colorado Capital Building, Denver",
        type:"Commercial",
        tags: ["Denver"],
        improvementSize: 2.25,
        relevantCondition: "Good",
        address: [{
          street: "123 Colorado Street",
          city: "Denver",
          state: "Colorado",
          zipCode: 80202
        }]
      });

    }
  })
}

exports.createDefaultProperties = createDefaultProperties;