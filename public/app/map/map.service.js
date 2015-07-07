(function () {
  'use strict';

  angular
    .module('app')
    .factory('mapService', mapService);

    /* @ngInject */
    function mapService($http) {

       var map = $http('/api/properties');

       return map;
    };

})();