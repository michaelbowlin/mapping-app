(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpCoPageScreensize', mpCoPageScreensize);

    function mpCoPageScreensize(){
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs){

            },
            controller: function($scope){
                $scope.changePanel = function(choice){
                    if(choice === "small"){
                        $scope.psize = 1;
                    } else if(choice === "large"){
                        $scope.psize = 2;
                    }
                }
            }
        }
    };


})();
