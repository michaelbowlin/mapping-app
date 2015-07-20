(function() {
  'use strict'

  angular
    .module('app')
    .factory('cachedDropDownListService', function(dropDownListService, $q) {
      var dropDownList;
      return {

        query: function() {
          if (!dropDownList) {
            dropDownList = dropDownListService.get();
          }
          
          // console.log(dropDownList);
          
          return dropDownList;
        }
      }
    })
})();