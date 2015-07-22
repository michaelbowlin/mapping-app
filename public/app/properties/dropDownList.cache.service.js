(function() {
  'use strict'

  angular
    .module('app')
    .factory('cachedDropDownListService', function(dropDownListService, $q) {
      var dropDownList;
      return {

        getLists: function() {
          if (!dropDownList) {
            dropDownList = dropDownListService.getLists();
          }
          
          return dropDownList;
        }
      }
    })
})();