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

exports.createProperty = function(req, res, next) { // request, response, next function etc
  var propertyData = req.body;
  //propertyData.title = propertyData.username.toUpperCase();
  //propertyData.latCoord = propertyData.
  //
  //userData.salt = encrypt.createSalt();
  //userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  Property.create(propertyData, function(err) {
    if(err) {
      //if(err.toString().indexOf('E11000') > -1) {
      //  err = new Error('Duplicate Username');
      //}
      res.status(400);
      return res.send({reason:err.toString()});
    }
    //req.logIn(user, function(err) {
    //  if(err) {return next(err);}
    //  res.send(user);
    //})
  })
};

exports.updateProperty = function(req, res) {
  var userUpdates = req.body;

  if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }
  req.user.save(function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    res.send(req.user);
  });
};