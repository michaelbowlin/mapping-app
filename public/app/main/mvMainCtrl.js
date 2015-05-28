(function(){
  'use strict';

  angular
    .module('app')
    .controller('mvMainCtrl', myMainCtrl);

  function myMainCtrl($scope, mvCachedCourses, mvCachedProperties) {

      $scope.courses = mvCachedCourses.query();
      $scope.properties = mvCachedProperties.query();
      $scope.pageClass = 'page-contact';

      /* Change Body Size */
      $scope.psize = 1;
      $scope.pdisplay = 1;


    }

})();