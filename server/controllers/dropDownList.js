var List = require('mongoose').model('DropDownList');

exports.getLists = function(req, res) {
  List.find({}).exec(function(err, collection) {

    res.send(collection);
  })
};
