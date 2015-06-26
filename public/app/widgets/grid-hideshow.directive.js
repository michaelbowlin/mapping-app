(function() {
    'use strict';

    angular
        .module('app')
        .directive('mpCoGridHideshow', mpCoGridHideshow);

    function mpCoGridHideshow() {
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/grid-hideshow.html',
            link: function(scope,element,attrs){
                $( '.target' ).change(function() {
                    $('.grid-wrap').toggleClass('grid-toggle')
                });
            }
        }
    }

})();