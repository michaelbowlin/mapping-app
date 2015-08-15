(function(){
  'use strict';

  angular
    .module('app')
    .controller('main.controller', mainController);

  function mainController(cachedPropertiesService,$scope, $location) {
    var vm = this;

      vm.properties = cachedPropertiesService.query();

      $scope.showPageHero = $location.path() === '/';

  };


})();