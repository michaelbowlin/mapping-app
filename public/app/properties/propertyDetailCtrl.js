angular
  .module('app')
  .controller('propertyDetailCtrl', function(cachedPropertiesService, $routeParams) {

  var vm = this;

  cachedPropertiesService.query().$promise.then(function(collection) {
    collection.forEach(function(property) {
      if(property._id === $routeParams.id) {
        vm.property = property;
      }
    })
  })



});