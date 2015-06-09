angular
	.module('app')
	.controller('propertyListController', function(propertyService) {
	  var vm = this;
	  
	  vm.properties = propertyService.query();
	  
	  console.log(vm.properties);
});