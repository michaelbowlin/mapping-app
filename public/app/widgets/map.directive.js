(function(){
    'use strict';

    angular
        .module('app')
        .directive('arCoMap', arCoMap);

    function arCoMap(){
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/map.html',
            scope: {
                markers: '='
            },
            controller: (function(/*$scope*/){
                //*** keep - This is one way of displaying the data via the controller
                // var vm = this;
                // vm.markers = $scope.markers;
            }),
            bindToController: true // *** using the bindToController due to speed

        };
    };

})();
