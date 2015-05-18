angular.module('app').controller('propertyDetailCtrl', function($scope, cachedPropertiesService, $routeParams) {
  cachedPropertiesService.query().$promise.then(function(collection) {
    collection.forEach(function(property) {
      if(property._id === $routeParams.id) {
        $scope.property = property;
      }
    })
  })
});