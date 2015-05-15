(function(){
  'use strict';

  angular
    .module('app')
    .controller('main.controller', mainController);

  function mainController(mvCachedCourses, mvCachedProperties) {
    var vm = this;

      vm.courses = mvCachedCourses.query();
      vm.properties = mvCachedProperties.query();

  };


})();