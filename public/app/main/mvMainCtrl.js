(function(){
  'use strict';

  angular
    .module('app')
    .controller('mvMainCtrl', myMainCtrl);

  function myMainCtrl($scope, mvCachedCourses, mvCachedProperties) {

      $scope.courses = mvCachedCourses.query();
      $scope.properties = mvCachedProperties.query();




  };


})();