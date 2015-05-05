(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'marketing',
                config: {
                    url: '/marketing',
                    templateUrl: 'app/marketing/marketing.html',
                    controller: 'Marketing',
                    controllerAs: 'vm',
                    title: 'Marketing',
                    settings: {
                        nav: 60,
                        content: '<i class="fa fa-money"></i> Marketing'
                    }
                }
            }
        ];
    }
})();
