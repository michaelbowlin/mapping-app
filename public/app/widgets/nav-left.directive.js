(function(){
    'use strict';

    angular
        .module('app')
        .directive('mpCoLeftnav', mpCoLeftnav);

    function mpCoLeftnav(){
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/nav-left.html',
            link: function(scope, element){
                //var config = scope.mpCoLeftnav;
                //if(!config || !config.selector){
                //    return;
                //}
                //element.bind('click', function(){
                //    alert("sadf" + element);
                //    var leftNavEl = angular.element(document.querySelector(congig.selector));
                //    alert(leftNavEl);
                //});

                var navToggle = angular.element(document.getElementById("nav-toggle"));
                var navWrap = angular.element(document.getElementById("nav-wrap"));

                navToggle.bind('click', function(){
                   if(navWrap.hasClass('expand')){
                       navWrap.removeClass('expand');
                   } else if (!navWrap.hasClass('expand')) {
                       navWrap.addClass('expand');
                   }
                });





            },
            controller: function(){

            }
        }
    }

})();

