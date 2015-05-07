angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourses, mvCachedProperties) {
  $scope.courses = mvCachedCourses.query();
  $scope.properties = mvCachedProperties.query();
});