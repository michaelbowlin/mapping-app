var Property = require('mongoose').model('Property');

exports.getProperties = function(req, res) {
  Property.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getPropertiesById = function(req, res) {
  Property.findOne({_id:req.params.id}).exec(function(err, course) {
    res.send(course);
  })
}