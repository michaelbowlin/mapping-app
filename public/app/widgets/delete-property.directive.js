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
        deleteThisItem: '&delete'
      },
      link: function(scope, element, attrs) {

      },
      controller: function($scope, $http) {
        //
        //
        //$scope.deleteProperty = function(id) {
        //  //alert('============================ ' + id);
        //  $scope.deleteThisItem;
        //};



        /* Passing method to View then back to controller */
        //$scope.confirmRemove = function(){
        //    $scope.notifyParent();
        //}
      }
    }
  };


})();
