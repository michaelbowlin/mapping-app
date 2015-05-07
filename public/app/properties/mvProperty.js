angular.module('app').factory('mvProperty', function($resource) {
  var PropertyResource = $resource('/api/properties/:_id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });

  return PropertyResource;
});