angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService) {
		var vm = this;

  vm.properties = cachedPropertiesService.query();
  console.log(vm.properties);

	vm.go = function( location ){
		$location.path( location );
	}

});
