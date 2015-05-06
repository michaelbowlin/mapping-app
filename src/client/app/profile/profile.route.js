(function () {
  'use strict';

  angular
    .module('app.profile')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: 'app/profile/profile.html',
          controller: 'Profile',
          controllerAs: 'vm',
          title: 'Profile',
          settings: {
            nav: 40,
            content: '<i class="fa fa-user"></i> Profile'
          }
        }
      }
    ];
  }
})();
