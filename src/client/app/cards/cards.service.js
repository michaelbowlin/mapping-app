(function() {
    'use strict';

    angular
        .module('app.cards')
        .factory('cardsService', cardsService);

    /* @ngInject */
    function cardsService($http, $location, $q, exception, logger, $resource) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getCards: getCards,
            ready: ready
        };

        return service;

        /* Get Cards */
        function getCards() {
            return restRequest('https://flashcardapp-5daily.azure-mobile.net/tables/cards', 'GET')
                .then(getCardsComplete);

            function getCardsComplete(data, status, headers, config) {
                return data;
            }
        }

        /* Reusable REST Request */
        function restRequest(pUrl, pMethod, pDataObj) {

            /* build request */
            var req = {
                method: pMethod,
                url: pUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: pDataObj
            };

            //Creating a deferred object
            var deferred = $q.defer();

            //Calling service on server
            $http(req).success(function(data) {
                //deferred promise
                deferred.resolve(data);
            }).error(function(status) {
                var url;
                deferred.reject('An error while populating calling ' + url);
            });

            //Returning the promise object
            return deferred.promise;
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
