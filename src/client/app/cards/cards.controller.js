(function () {
    'use strict';

    angular
        .module('app.cards')
        .controller('Cards', Cards);

    /* @ngInject */
    function Cards($stateParams, $window, logger, $state, cardsService) {
        var vm = this;
        vm.gotocard = gotocard;
        vm.getCards = getCards;
        vm.title = 'Cards';
        activate();

        function activate() {
            return getCards()
                .then(function () {
                logger.info('Activated cards View');
            });
        }

        function getCards() {
            return cardsService.getCards()
                .then(function (data) {
                vm.cards = data;
                return vm.cards;
            });
        }

        function gotocard(c) {
            $state.go('card.detail', {
                id: c.id
            });
        }
    }
})();
