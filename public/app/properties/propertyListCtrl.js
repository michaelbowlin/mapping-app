angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService, $scope) {
		var vm = this;

		vm.properties = cachedPropertiesService.query();

		vm.go = function( location ){
			$location.path( location );
		}

		$scope.showLeftNav = function(){
			alert("asdf")
		}

		//var itemsPerPage = vm.properties;
		//var itemsPerPageSkip = vm.properties;
		//var maxPaginationSize = vm.properties;
		//var totalItems = vm.properties;
		//var sortBy = vm.properties;

});
