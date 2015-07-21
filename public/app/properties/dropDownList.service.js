(function() {
  'use strict'

  angular
    .module('app')
    .factory('dropDownListService', function($resource) {

      var listResource = $resource('/api/lists', 
      	{query: {method: 'GET', isArray: true}
      });



      return listResource;
    });
})();
