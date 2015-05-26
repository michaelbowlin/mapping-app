angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService) {
		var vm = this;

  vm.properties = cachedPropertiesService.query();

	vm.go = function( location ){
		$location.path( location );
	}

});
