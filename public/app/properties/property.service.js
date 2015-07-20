(function() {
  'use strict'

  angular
    .module('app')
    .factory('propertyService', function($resource) {

      var PropertyResource = $resource('/api/properties/:_id', {
        _id: "@id"
      }, {
        update: {
          method: 'PUT',
          isArray: false
        }
      });

      return PropertyResource;
    });
})();
