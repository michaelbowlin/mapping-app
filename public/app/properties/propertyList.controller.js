(function(){
	'use strict'

	angular
		.module('app')
		.controller('propertyListController', function(propertyService) {
		  var vm = this;

		  vm.properties = propertyService.query();

	});
})();