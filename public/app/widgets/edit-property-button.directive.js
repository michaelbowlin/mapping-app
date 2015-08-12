(function(){
    'use strict';

    angular
        .module('app')
        .directive('editPropertyButton',function(){
            return {
                templateUrl: "/app/widgets/edit-property-button.html",
                restrict: "E"

            }
        });



})();