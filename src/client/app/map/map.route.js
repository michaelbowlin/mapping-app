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
                state: 'map',
                config: {
                    url: '/map',
                    templateUrl: 'app/map/map.html',
                    controller: 'Map',
                    controllerAs: 'vm',
                    title: 'Mapping',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-map-marker"></i> Mapping'
                    }
                }
            }
        ];
    }
})();
