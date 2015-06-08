(function(){
  'use strict';

  angular
    .module('app')
    .controller('main.controller', mainController);

  function mainController(mvCachedCourses, cachedPropertiesService,$scope, $location) {
    var vm = this;

      vm.courses = mvCachedCourses.query();
      vm.properties = cachedPropertiesService.query();

    //controller('routeController', ['$scope', '$location', function($scope, $location) {
      $scope.showPageHero = $location.path() === '/';
    //}]);

      //$scope.changePanel = function(choice){
      //  console.log('================================= 11111');
      //  if(choice === "small"){
      //    console.log('================================= WORKING');
      //    $scope.psize = 1;
      //  } else if(choice === "large"){
      //    $scope.psize = 2;
      //  }
      //}

  };


})();