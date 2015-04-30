(function() {
    'use strict';

    angular
        .module('app.inventory')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'inventory',
                config: {
                    abstract: true,
                    template: '<ui-view class="shuffle-animation"/>',
                    url: '/inventory'
                }
            },
            {
                state: 'inventory.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/inventory/inventory.html',
                    controller: 'Inventory',
                    controllerAs: 'vm',
                    title: 'inventory',
                    settings: {
                        nav: 20,
                        content: '<i class="fa fa-list-ul"></i> Inventory'
                    }
                }
            }
        ];
    }
})();
