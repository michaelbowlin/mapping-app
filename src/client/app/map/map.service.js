(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('mapService', mapService);

    /* @ngInject */
    function mapService($http, $location, $q, exception, logger, $resource) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getCities: getCities,
            deleteCities: deleteCities,
            createCity: createCity,
            ready: ready
        };

        return service;

        var paramsObj = {};

        activate();

        /* Get Cities */
        function getCities(paramsObj) {

            var currentPage = paramsObj.currentPage;
            var itemsPerPage = paramsObj.itemsPerPage;
            var itemsPerPageSkip = paramsObj.itemsPerPageSkip;
            var maxPaginationSize = paramsObj.maxPaginationSize;
            var totalItems = paramsObj.totalItems;
            var sortBy = paramsObj.sortBy; 
                     
            return restRequest('https://dummy-data.azure-mobile.net/tables/data?$top=' + itemsPerPage + '&$skip=' + itemsPerPageSkip + '&$orderby=' +  sortBy + '%20asc', 'GET')

                .then(getCitiesComplete);

            function getCitiesComplete(data, status, headers, config) {
                return data;
            }
        }

        /* Delete Cities */
        function deleteCities(id){
            return restRequest('https://dummy-data.azure-mobile.net/tables/data/' + id)
                .then(deleteCitiesComplete);

            function deleteCitiesComplete(data, status, headers, config) {
                return data;
            }
        }

        /* Create City */
        function createProperty(myData){
            return restRequest('https://dummy-data.azure-mobile.net/tables/data/', 'POST', myData)
                .then(createdCity);

            function createdCity(data, status, headers, config){
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