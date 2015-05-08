var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
  street: {type: String},
  city: {type: String},
  state: {type: String},
  zipCode: {type: Number}
});


var propertySchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!'},
  latCoord: {type: Number, required:'{PATH} is required!'},
  longCoord: {type: Number, required:'{PATH} is required!'},
  description: {type: String, required:'{PATH} is required!'},
  dateAdded: {type: Date, required:'{PATH} is required!', default: Date.now()},
  dateComplete: {type: Date, required:'{PATH} is required!', default: Date.now()},
  imporvementSize: {type:Number},
  improvementSizeType: {type: String, default: "Acres"},
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
      address: {
        street: "123 Colorado Street",
        city: "Denver",
        state: "Colorado",
        zipCode: "80202"
      }
      });

    }
  })
}

exports.createDefaultProperties = createDefaultProperties;