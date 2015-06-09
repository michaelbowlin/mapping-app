(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpCoLbJoin', mpCoLbJoin);

    function mpCoLbJoin(){
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/lightbox-join.html',
            link: function(scope, element, attrs){

            },
            controller: function($scope){


            }
        }
    };


})();


