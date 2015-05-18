angular
	.module('app')
	.controller('propertyListCtrl', function($scope, cachedPropertiesService) {
  $scope.properties = cachedPropertiesService.query();

  //$scope.sortOptions = [{value:"title",text: "Sort by Title"},
  //  {value: "published",text: "Sort by Publish Date"}];
  //$scope.sortOrder = $scope.sortOptions[0].value;
});
