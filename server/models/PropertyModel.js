var mongoose = require('mongoose'),
    addressSchema = require('./AddressModel.js');

var propertySchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!', default:'New Property'},
  productType: { type: String },
  propertyTypeCategory: { type: String },
  propertyType: {type: String, required:'{PATH} is required!', default: 'Commercial'},
  address: [ addressSchema ],
  latCoord: { type: Number },
  longCoord: { type: Number },
  imporvementSize: { type: String },
  // state: { type: String },
  relevantCondition: { type: String },
  relevantCondition2: { type: String },
  relevantCondition3: { type: String },
  relevantCondition4: { type: String },
  dateAdded: { type: Date, required:'{PATH} is required!', default: Date.now() },
  dateComplete: { type: Date, required:'{PATH} is required!', default: Date.now() },
  userAccount: { type: String }
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