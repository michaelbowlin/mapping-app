angular
	.module('app')
	.factory('cachedPropertiesService', function(propertyService) {
      var propertyList;
      console.log('==================== PROPERTY LIST1 : ' + propertyList)
      return {

        query: function() {
          if(!propertyList) {
            propertyList = propertyService.query();
            console.log('==================== PROPERTY LIST2 : ' + propertyList)
          }

          return propertyList;
        }
      }
})