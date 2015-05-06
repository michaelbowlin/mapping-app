(function () {
  'use strict';

  angular
    .module('app.profile')
    .controller('Profile', Profile);

  function Profile($state, logger) {
    var vm = this;
    // vm.customers = [];
    // vm.gotoCustomer = gotoCustomer;
    vm.title = 'Dashboard';

    activate();

    function activate() {
      // return getCustomers().then(function() {
      //     logger.info('Activated Dashboard View');
      // });
    }


  }
})();
