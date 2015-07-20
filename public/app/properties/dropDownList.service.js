(function() {
  'use strict'

  angular
    .module('app')
    .factory('dropDownListService', function($http) {
      return {

        get: function(){
          $http.get('/api/lists').success(function(response) {
            console.log(response);
            return response;
          });
        }
      }

    });
})();
