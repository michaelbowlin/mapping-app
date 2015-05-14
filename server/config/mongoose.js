var mongoose = require('mongoose'),
    userModel = require('../models/UserModel'),
    courseModel = require('../models/CourseModel'),
    propertyModel = require('../models/PropertyModel');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('mapping application db opened');
  });

  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
  propertyModel.createDefaultProperties();

};

