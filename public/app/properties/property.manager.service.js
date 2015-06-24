angular
  .module('app')
  .factory('propertyManager', function($http, $q, propertyService){
    return{

      createProperty: function(newPropertyData){
        alert("property.manage.service")
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

      /*deleteProperty: function(){ // TODO: make this delete work
       return $resource('users', {}, {
       update: {
       method:'PUT', isArray:false
       },
       remove: {
       method: 'DELETE',
       url: '/api/properties/:_id',
       params: {id: '@_id'}
       }
       });
       }*/

      /*
       var PropertyResource = $resource('/api/properties/:_id', {_id: "@id"}, {

       update: {
       method:'PUT', isArray:false
       },
       remove: {
       method: 'DELETE',
       url: '/api/properties/:_id',
       params: {id: '@_id'}
       }

       });

       return PropertyResource;
       */




    }
  });