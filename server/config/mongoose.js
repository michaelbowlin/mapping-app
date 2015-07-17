var mongoose = require('mongoose'),
    dropDownListModel = require('../models/DropDownListModel'),
    courseModel = require('../models/CourseModel'),
    propertyModel = require('../models/PropertyModel')
    userModel = require('../models/UserModel');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('appraisal application db opened');
  });

  dropDownListModel.createDropDownLists();
  courseModel.createDefaultCourses();
  propertyModel.createDefaultProperties();
  userModel.createDefaultUsers();

};

