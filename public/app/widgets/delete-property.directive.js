(function() {
    'use strict';

    angular
        .module('app')
        .directive('deleteProperty', deleteProperty);

    function deleteProperty() {
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/delete-property.html',
            //scope: { // TODO: rework to use isolated scope with a function
            //    notifyParent: '&method'
            //},
            link: function(scope, element, attrs) {

            },
            controller: function($scope,$http) {


                $scope.deleteProperty = function(title){
                    console.log('============================ ' + title);
                }

                /* Passing method to View then back to controller */
                //$scope.confirmRemove = function(){
                //    $scope.notifyParent();
                //}
            }
        }
    };


})();
