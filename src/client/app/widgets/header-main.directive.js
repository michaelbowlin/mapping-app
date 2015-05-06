(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('mapStHeaderMain', mapStHeaderMain);

  /* @ngInject */
  function mapStHeaderMain() {
    return {
      templateUrl: 'app/widgets/header-main.html',
      restrict: 'E'
    }
  };

})();
