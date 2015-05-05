(function() {
    'use strict';

    angular
        .module('app.cards')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'card',
                config: {
                    abstract: true,
                    template: '<ui-view class="shuffle-animation"/>',
                    url: '/card'
                }
            },
            {
                state: 'card.list',
                config: {
                    url: '/list',
                    templateUrl: 'app/cards/cards.html',
                    controller: 'Cards',
                    controllerAs: 'vm',
                    title: 'cards',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-photo"></i> Cards'
                    }
                }
            }
        ];
    }
})();
