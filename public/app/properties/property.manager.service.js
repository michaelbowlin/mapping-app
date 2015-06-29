(function(){
    'use strict'

    angular
      .module('app')
      .factory('propertyManager', function($http, $q, propertyService){

        return{

          createProperty: function(newPropertyData){
            console.log("property.manage.service working! ============ " + newPropertyData);

            var newProp = new propertyService(newPropertyData);
            var dfd = $q.defer();

            newProp.$save().then(function(){
                console.log('dfd.resolve ............................................')
                dfd.resolve(); //FIXME: Dosen't appear to be doing anything
            },function(response){
                console.log('dfd.reject  ............................................')
                dfd.reject(response.data.reason) //FIXME: Dosen't appear to be doing anything

            });

      deleteProperty: function(id){ // TODO: make this delete work
        return $resource('properties', {
          remove: {
             method: 'DELETE',
             url: '/api/properties/:_id',
             params: {id: '@_id'}
             }
        });
       }
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
            }

        }
      });

})();