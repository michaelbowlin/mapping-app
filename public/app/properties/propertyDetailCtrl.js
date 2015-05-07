angular.module('app').controller('propertyDetailCtrl', function($scope, mvCachedProperties, $routeParams) {
  mvCachedProperties.query().$promise.then(function(collection) {
    collection.forEach(function(property) {
      if(property._id === $routeParams.id) {
        $scope.property = property;
      }
    })
  })
});