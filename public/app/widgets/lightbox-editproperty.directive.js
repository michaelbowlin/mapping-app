(function() {
    'use strict';

    angular
        .module('app')
        .directive('mpCoLbEditprop', mpCoLbEditprop);

    function mpCoLbEditprop() {
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/lightbox-editproperty.html',
            scope: {
                //refreshMap: '&',
                //refreshGrid: '&'
            },
            link: function(scope, element, attrs) {

            },
            controller: function() {

            }
        }
    }

})();