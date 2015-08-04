var List = require('mongoose').model('DropDownList');

exports.getLists = function(req, res) {
  List.find({}).exec(function(err, collection) {

  	var dropDownListMap = {};
  	collection.forEach(function(list){
  		dropDownListMap[list.title] = list;
  	});

    // res.send(collection);
    res.send(dropDownListMap);
  })
};
