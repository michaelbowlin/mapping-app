angular
  .module('app')
  .factory('propertyManager', function($http, $q, propertyService){
    return{

      createProperty: function(newPropertyData){
        var newProp = new propertyService(newPropertyData);
        var dfd = $q.defer();

        newProp.$save().then(function(){
          dfd.resolve();
        },function(response){
          dfd.reject(response.data.reason)
        });
        return dfd.promise;
      },

      getProperties: function(){
        var dfd = $q.defer();
        console.log("called");

        propertyService.query(function(){
          dfd.resolve();
        }, function(response){
          dfd.reject(response.data.reason)
        });      
        return dfd.promise;
        },

      getPropertiesById: function(){

      }


    }
  });