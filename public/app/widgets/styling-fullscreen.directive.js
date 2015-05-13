(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpDeFullscreen', mpDeFullscreen);

    function mpDeFullscreen(){
            return {
                restrict: 'E',
                replace: true,
                link: function(scope, element, attrs){
                    var wrap = angular.element(document.getElementById('wrap'));
                    var menu = angular.element(document.getElementById('main-menu'));
                    wrap.addClass('wrap-full');
                    menu.addClass('hide');
                }
            }
        };


})();
