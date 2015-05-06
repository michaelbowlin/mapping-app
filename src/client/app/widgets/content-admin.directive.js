(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('mapStContentAdmin', mapStContentAdmin);

  /* @ngInclude */
  function mapStContentAdmin() {
    return {
      templateUrl: 'app/widgets/content-admin.html',
      restrict: 'E',
      scope: {
        colWidth: '='
      }
    }
  }

})();