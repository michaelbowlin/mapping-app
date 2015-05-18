(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpDeNoFullscreen', mpDeNoFullscreen);

    function mpDeNoFullscreen(){
            return {
                restrict: 'E',
                replace: true,
                link: function(scope, element, attrs){
                    var wrap = angular.element(document.getElementById('wrap'));
                    var menu = angular.element(document.getElementById('main-menu'));
                    wrap.removeClass('wrap-full').addClass('wrap-normal');
                    menu.removeClass('hide').addClass('show');
                }
            }
        };


})();
