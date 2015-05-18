angular
	.module('app')
	.factory('cachedPropertiesService', function(propertyService) {
  var propertyList;

  return {
    query: function() {
      if(!propertyList) {
        propertyList = propertyService.query();
      }

      return propertyList;
    }
  }
})