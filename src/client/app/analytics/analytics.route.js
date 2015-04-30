(function() {
    'use strict';

    angular
        .module('app.analytics')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'analytics',
                config: {
                    url: '/analytics',
                    templateUrl: 'app/analytics/analytics.html',
                    controller: 'Analytics',
                    controllerAs: 'vm',
                    title: 'Analytics',
                    settings: {
                        nav: 50,
                        content: '<i class="fa fa-pie-chart"></i> Analytics'
                    }
                }
            }
        ];
    }
})();
