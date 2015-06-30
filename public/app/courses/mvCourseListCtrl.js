(function(){
  'use strict'

  angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();
    console.log($scope.courses);

    $scope.sortOptions = [{value:"title",text: "Sort by Title"},
      {value: "published",text: "Sort by Publish Date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
  });
})();