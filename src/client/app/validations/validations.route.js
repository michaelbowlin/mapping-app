(function() {
    'use strict';

    angular
        .module('app.validations')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'validation',
                config: {
                    abstract: true,
                    template: '<ui-view class="shuffle-animation"/>',
                    url: '/validation'
                }
            },
            {
                state: 'validation.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/validations/validations.html',
                    controller: 'Validations',
                    controllerAs: 'vm',
                    title: 'Validations',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-check"></i> Validations'
                    }
                }
            }
        ];
    }
})();
