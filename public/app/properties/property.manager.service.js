angular
  .module('app')
  .factory('propertyManager', function($http, $q, propertyService, $resource) {
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

      deleteProperty: function(id) {
        var dfd = $q.defer();
        $http.delete("/api/properties/" + id)
            .then(function(){
              alert('winning???');
            });
        return dfd.promise;
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
