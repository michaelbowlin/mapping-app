angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService, $http, uiGridConstants) {
		var vm = this;

		vm.properties = cachedPropertiesService.query();

		vm.go = function( location ){
			$location.path( location );
		}

		console.log(vm.properties);



	});
