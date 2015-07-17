(function() {
  'use strict';

  angular
    .module('app')
    .directive('deleteProperty', deleteProperty);

  function deleteProperty() {
    return {
      restrict: 'E',
      templateUrl: '/app/widgets/delete-property.html',
      scope: {

      },
      link: function(scope, element, attrs) {

      },
      controller: function() {

      }
    }
  };


})();
