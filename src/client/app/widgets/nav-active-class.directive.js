(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('navActiveClass', navActiveClass);

    /* @ngInject */
    function navActiveClass($location){
        return {
            restrict: 'A',
            link: function postLink(scope, element) {
                scope.$watch(function () {
                    return $location.path();
                    // alert('================= 9 ' + $location.path())

                }, function (path) {
                    //alert(path)
                    angular.forEach(element.children(), (function (li) {
                        var $li = angular.element(li),
                            regex = new RegExp('^' + $li.attr('data-match-route') + '$', 'i'),
                            isActive = regex.test(path);

                        console.log('================= 1 ' + $li)
                        console.log('================= 2 ' + regex)
                        console.log('================= 3 ' + isActive)
                        /*
                         *
                         *       ** NEED - To fix... currently not working
                         *
                         */
                        $li.toggleClass('active', isActive);
                    }));
                });
            }
        };
    };


})();

// http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js