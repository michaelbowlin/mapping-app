(function() {
    'use strict';

    angular
        .module('app.marketing')
        .controller('Marketing', Marketing);

    function Marketing($state, logger) {
        var vm = this;
        // vm.customers = [];
        // vm.gotoCustomer = gotoCustomer;
        vm.title = 'Marketing';

        activate();

        function activate() {
            // return getCustomers().then(function() {
            //     logger.info('Activated Dashboard View');
            // });
        }


    }
})();
