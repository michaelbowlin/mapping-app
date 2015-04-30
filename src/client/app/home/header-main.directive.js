(function(){
    'use strict';

    angular
        .module('app.home')
        .directive('mapStHeaderMain', mapStHeaderMain);

    /* @ngInject */
    function mapStHeaderMain (){
        return {
            templateUrl: 'app/home/header-main.html',
            restrict: 'E'
        }
    };

})();
