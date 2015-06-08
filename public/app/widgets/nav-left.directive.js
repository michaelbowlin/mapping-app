(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpCoLeftnav', mpCoLeftnav);

    function mpCoLeftnav(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/app/widgets/nav-left.html',
            link: function(scope, element, attrs){

            },
            controller: function(){

            }
        }
    }

})();

