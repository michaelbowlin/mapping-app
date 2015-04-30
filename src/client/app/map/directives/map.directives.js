(function(){
    'use strict';


angular
    .module('app.map')
    .directive('paintMap', paintmap);

    /* @ngInject */
    function paintmap(){
        return {
            templateUrl: 'app/map/directives/templates/paint-map.html',
            restrice: 'E',
            scope: '',
            link: function($scope, attrs, element){

            },
            controller: function(){

            }
        }
    }

})();