var mongoose = require('mongoose'),
    addressSchema = require('./AddressModel.js');

var propertySchema = mongoose.Schema({
  // title: {type:String, required:'{PATH} is required!'},
  // latCoord: {type: Number, required:'{PATH} is required!'},
  // longCoord: {type: Number, required:'{PATH} is required!'},
  // description: {type: String, required:'{PATH} is required!'},
  // dateAdded: {type: Date, required:'{PATH} is required!', default: Date.now()},
  // dateComplete: {type: Date, required:'{PATH} is required!', default: Date.now()},
  // imporvementSize: {type:Number},
  // improvementSizeType: {type: String, default: "Acres"},
  // condition: {type: String},
  // type: {type: String, required:'{PATH} is required!', default: 'Commercial'},
  // address: [ addressSchema ],
  // userAccount: {type: String},
  // tags: [String]

  title: {type:String, required:'{PATH} is required!', default:'Test'},
  latCoord: {type: Number},
  longCoord: {type: Number},
  description: {type: String},
  dateAdded: {type: Date, required:'{PATH} is required!', default: Date.now()},
  dateComplete: {type: Date, required:'{PATH} is required!', default: Date.now()},
  imporvementSize: {type:Number},
  improvementSizeType: {type: String, default: "Acres"},
  condition: {type: String},
  type: {type: String, required:'{PATH} is required!', default: 'Commercial'},
  address: [ addressSchema ],
  userAccount: {type: String},
  tags: [String]
});


var Property = mongoose.model('Property', propertySchema);

function createDefaultProperties() {
  Property.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Property.create({title: "Colorado Capital",
        latCoord: 39.7394199,
        longCoord: -104.9847909,
        description: "Colorado Capital Building, Denver",
        type:"Commercial",
        tags: ["Denver"],
        improvementSize: 2.25,
        condition: "Good",
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