angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService) {
		var vm = this;

		vm.properties = cachedPropertiesService.query();

		vm.go = function( location ){
			$location.path( location );
		}

		//var itemsPerPage = vm.properties;
		//var itemsPerPageSkip = vm.properties;
		//var maxPaginationSize = vm.properties;
		//var totalItems = vm.properties;
		//var sortBy = vm.properties;

});
