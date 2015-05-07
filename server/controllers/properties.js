var Course = require('mongoose').model('Property');

exports.getProperties = function(req, res) {
  Course.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getPropertiesById = function(req, res) {
  Course.findOne({_id:req.params.id}).exec(function(err, course) {
    res.send(course);
  })
}