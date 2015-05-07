angular.module('app').factory('mvCachedProperties', function(mvProperty) {
  var propertyList;

  return {
    query: function() {
      if(!propertyList) {
        propertyList = mvProperty.query();
      }

      return propertyList;
    }
  }
})