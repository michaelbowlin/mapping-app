(function() {
    'use strict';

    angular
        .module('app.inventory')
        .factory('inventoryService', inventoryService);

    /* @ngInject */
    function inventoryService($http, $location, $q, exception, logger, $resource) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getInventory: getInventory,
            deleteInventoryitem: deleteInventoryitem,
            addItem: addItem,

            // getinventorystatuses: getinventorystatuses,
            // updateinventoryline: updateinventoryline,
            // addinventoryline: addinventoryline,
            // getstoredval: getstoredval,

            ready: ready
        };

        return service;

        function getstoredval(key){
            return storage.getValue(key);
        }

        /* Get Inventory */
        function getInventory() {

            // var pageNum = paramsObj.pageNum;
            // var pageSize = paramsObj.pageSize;
            // var sortCol = paramsObj.sortCol;
            // var sortDir = paramsObj.sortDir;
            // var inventoryNumber = paramsObj.inventoryNumber;
            // var inventoryStatus = paramsObj.inventoryStatus;
            // var resellerName = paramsObj.resellerName;

            // var service_url = config.baseInventoryServiceUrl+'pagedInventory?page='+pageNum+'&size='+pageSize+'&sortCols='$sortCol+'&sortOrder='+sortDir;

            // if (inventoryNumber != undefined){
            //     service_url+="&inventoryNumber="+inventoryNumber;
            // }
            // if (inventoryStatus != undefined) {
            //     service_url+="&inventoryStatus="+inventoryStatus;
            // }
            // if (resellerName != undefined) {
            //     service_url+="&reseller="+resellerName;
            // }

            // return restRequest(service_url,'GET')
            //     .then(getInventoryComplete);

            return restRequest('https://dummy-data.azure-mobile.net/tables/data/', 'GET')
                .then(getInventoryComplete);

            function getInventoryComplete(data, status, headers, config) {
                return data;
            }
        }

        /* Get Specific Item */
        // function getItem(id) {
        //     return restRequest('https://dummy-data.azure-mobile.net/tables/data/' + id, 'GET')
        //     //     .then(getInventoryComplete);

        //     // function getInventoryComplete(data, status, headers, config) {
        //     //     return data;
        //     // }
        // }

        /* Delete Inventory Item */
        function deleteInventoryitem(id) {
            return restRequest('https://dummy-data.azure-mobile.net/tables/data/' + id, 'DELETE');
        }

        /* Add Inventory Item */
        function addItem(myItem) {
            return restRequest('https://dummy-data.azure-mobile.net/tables/data/', 'POST', myItem);
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
