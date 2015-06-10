(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpCoLbAddprop', mpCoLbAddprop);

    function mpCoLbAddprop(){
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/lightbox-addproperty.html',
            link: function(scope, element, attrs){

            },
            controller: function($scope){


            }
        }
    };


})();


