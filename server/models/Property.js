var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!'},
  featured: {type:Boolean, required:'{PATH} is required!'},
  published: {type:Date, required:'{PATH} is required!'},
  tags: [String]
});
var Property = mongoose.model('Property', propertySchema);

function createDefaultProperties() {
  Property.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Property.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});

    }
  })
}

exports.createDefaultProperties = createDefaultProperties;