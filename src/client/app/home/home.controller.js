(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('Home', Home);

    function Home($state, logger) {
        var vm = this;
        // vm.customers = [];
        // vm.gotoCustomer = gotoCustomer;
        vm.title = 'Home';

        activate();

        function activate() {
            // return getCustomers().then(function() {
            //     logger.info('Activated Dashboard View');
            // });
        }


    }
})();
