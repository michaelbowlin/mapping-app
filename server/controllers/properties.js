var Property = require('mongoose').model('Property');

exports.getProperties = function(req, res) {
  Property.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getPropertyById = function(req, res) {
  Property.findOne({
    _id: req.params.id
  }).exec(function(err, property) {
    res.send(property);
  })
};

exports.getPropertiesByUserId = function(req, res) {
  Property.find({
    userAccount: req.params.id
  }).exec(function(err, property) {
    res.send(property);
  })
};

exports.createProperty = function(req, res, next) { // request, response, next function etc
  var propertyData = req.body;
  console.log(propertyData);
  Property.create(propertyData, function(err) {
    if (err) {
      res.status(400);
      return res.send({
        reason: err.toString()
      });
    } else {
      res.status(200);
    }
  })
};

exports.deleteProperty = function(req, res) {
  Property.remove({
    _id: req.params.id
  }).exec(function(err, property) {
    res.send(200);
  });
};

exports.updateProperty = function(req, res) {


  //if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
  //  res.status(403);
  //  return res.end();
  //}
  Property.findById(req.params.id).exec(function(err, property) {
    
    var propertyUpdates = req.body;
    
    if ( propertyUpdates.title ) {
      property.title = propertyUpdates.title; 
    }
    if ( propertyUpdates.company ) {
      property.company = propertyUpdates.company; 
    }
    if ( propertyUpdates.latCoord ) { 
      property.latCoord = propertyUpdates.latCoord; 
    }
    if ( propertyUpdates.longCoord ) { 
      property.longCoord = propertyUpdates.longCoord; 
    }
    if ( propertyUpdates.description ) { 
      property.description = propertyUpdates. description; 
    }
    if ( propertyUpdates.dateComplete ) { 
      propertyUpdates.dateComplete = propertyUpdates.dateComplete; 
    }
    if ( propertyUpdates.improvementSize ) {
      property.improvementSize = propertyUpdates.improvementSize;
    }
    if ( propertyUpdates.improvementSizeType ) {
      property.improvementSizeType = propertyUpdates.improvementSizeType;
    }
    if ( propertyUpdates.condition ) {
      property.condition = propertyUpdates.condition;
    }
    if ( propertyUpdates.type ) {
      property.type = propertyUpdates.type;
    }
    if ( propertyUpdates.address ) {
      property.address = propertyUpdates.address;
    }
    if( propertyUpdates.tags ) {
      property.tags = propertyUpdates.tags;
    }

    if(err){
      res.send(err);
    }
          
    property.save(function(err) {
      if(err) { res.status(400); return res.send({reason:err.toString()});}
      res.send(req.property);
    });

  })

};