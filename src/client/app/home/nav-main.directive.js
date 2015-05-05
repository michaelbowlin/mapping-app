(function(){
    'use strict';

    angular
        .module('app.home')
        .directive('mapStNav', mapStNav);

    /* @ngInject */
    function mapStNav (){
        return {
            templateUrl: 'app/home/nav-main.html',
            restrict: 'E'
        }
    };


})();
