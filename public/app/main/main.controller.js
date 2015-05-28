(function(){
  'use strict';

  angular
    .module('app')
    .controller('main.controller', mainController);

  function mainController(mvCachedCourses, cachedPropertiesService) {
    var vm = this;

      vm.courses = mvCachedCourses.query();
      vm.properties = cachedPropertiesService.query();
  };


})();