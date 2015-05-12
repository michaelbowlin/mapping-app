var Property = require('mongoose').model('Property');

exports.getProperties = function(req, res) {
  Property.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getPropertyById = function(req, res) {
  Property.findOne({_id:req.params.id}).exec(function(err, course) {
    res.send(course);
  })
};

exports.createProperty = function(req, res, next) {
  var propertyData = req.body;
  Property.create(propertyData, function(err) {
    if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }else {
      res.status(200);
    }
  })
};

exports.updateProperty = function(req, res) {
  var propertyUpdates = req.body;

  //if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
  //  res.status(403);
  //  return res.end();
  //}
  req.property.title = propertyUpdates.title;
  req.property.latCoord = propertyUpdates.latCoord;
  req.property.longCoord = propertyUpdates.longCoord;
  req.property.description = propertyUpdates.description;
  req.property.dateComplete = propertyUpdates.dateComplete;
  req.property.improvementSize = propertyUpdates.improvementSize;
  req.property.improvementSizeType = propertyUpdates.improvementSizeType;
  req.property.condition = propertyUpdates.condition;
  req.property.type = propertyUpdates.type;
  req.property.address = propertyUpdates.address;
  req.property.tags = propertyUpdates.tags;


  req.property.save(function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    res.send(req.property);
  });
};