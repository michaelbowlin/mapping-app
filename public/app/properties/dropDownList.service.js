(function() {
  'use strict'

  angular
    .module('app')
    .factory('dropDownListService', function($http) {

      return {
        getLists: function() {

          return $http.get('/api/lists');

        }
      }

    });
})();