(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('mapStNav', mapStNav);

    /* @ngInject */
    function mapStNav (){
        return {
            templateUrl: 'app/widgets/nav-main.html',
            restrict: 'E',
            controller: function($scope, $location){

                $scope.currentPath = $location.path();

            }
        }
    };


})();
