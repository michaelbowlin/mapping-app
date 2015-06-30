angular
  .module('app')
  .factory('propertyManager', function($http, $q, propertyService) {
    return {

      createProperty: function(newPropertyData) {
        var newProp = new propertyService(newPropertyData);
        var dfd = $q.defer();

        newProp.$save().then(function() {
          dfd.resolve(); //FIXME: Dose not appear to work
        }, function(response) {
          dfd.reject(response.data.reason) //FIXME: Dose not appear to work
        });
        return dfd.promise;
      },

      getProperties: function() {
        var dfd = $q.defer();
        console.log("called");

        propertyService.query(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason)
        });
        return dfd.promise;
      },

      getPropertiesById: function() {

      },

      deleteProperty: function(id) { // TODO: make this delete work
        return $resource('properties', {
          remove: {
            method: 'DELETE',
            url: '/api/properties/:_id',
            params: {
              id: '@_id'
            }
          }
        });
      },

      updateProperty: function(id){
        var dfd = $q.defer();
        console.log("called");

        propertyService.query(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason)
        });
        return dfd.promise;
      }
    }
  });
