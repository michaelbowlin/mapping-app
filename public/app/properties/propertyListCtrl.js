angular.module('app').controller('propertyListCtrl', function($scope, mvCachedProperties) {
  $scope.properties = mvCachedProperties.query();

  //$scope.sortOptions = [{value:"title",text: "Sort by Title"},
  //  {value: "published",text: "Sort by Publish Date"}];
  //$scope.sortOrder = $scope.sortOptions[0].value;
});
