(function () {
    'use strict';

    angular
        .module('app.inventory')
        .controller('Inventory', Inventory);

    /* @ngInject */
    function Inventory($stateParams, $window, logger, $modal, $state, inventoryService) {
        var vm = this;
        vm.inventory = {};
        vm.gotoitem = gotoitem;
        vm.getInventory = getInventory;
        vm.deleteItem = deleteItem;
        vm.editlinemodal = editlinemodal;
        vm.addlinemodal = addlinemodal;

        // vm.setInitialParams = setInitialParams;
        // vm.pageChanged = pageChanged;
        // vm.pageSizeChanged = pageSizeChanged;
        // vm.refreshParamsObj = refreshParamsObj;
        // vm.sortChanged = sortChanged;
        // vm.findInventory = findInventory;

        activate();

// ng-show="vm.totalQuotes>0" ----- totalInventory
// boundary-links="true" 
// max-size="vm.maxDisplayed" 
// total-items="vm.totalQuotes" 
// ng-model="vm.currentPage" 
// items-per-page="vm.pageSize" 
// ng-click="vm.pageChanged()"

        function activate() {
            return getInventory($stateParams.inventoryId)
                .then(function () {
                logger.info('Activated cards View');
            });
        }

                    // function setInitialParams() {
                    //     vm.title = 'View Inventory';
                    //     vm.currentPage = 1;
                    //     vm.pageSize = 10;
                    //     vm.maxDisplayed = 5;
                    //     vm.sortCol = 'id';
                    //     vm.sortDir = 'desc';
                    //     vm.pageSizes = [10,20,50,100];
                    // }

        function getInventory(inventoryId) {
            return inventoryService.getInventory(inventoryId)
                .then(function (data) {
                    vm.inventory = data;

                    // work arround the UI Bootstrap bug
                    vm.currentPage = vm.paramsObj.pageNum + 1;

                    vm.totalInventory = data.totalElements;

                    return vm.inventory;
            });
        }

        function deleteItem(id){
            return inventoryService.deleteInventoryitem(id)
                .then(function(){
                    getInventory();
                });
        }

                // function sortChanged(col) {
                //     vm.sortCol = col;
                //     vm.currentPage = 1;

                //     if (vm.sortDir == 'asc') {
                //         vm.sortDir = 'desc'
                //     } else {
                //         vm.sortDir = 'asc';
                //     }

                //     vm.getInventory();
                // }

                // // refresh the parameters object
                // function refreshParamsObj() {

                //     logger.info('Called Refresh Parameters with Current Page')

                //     vm.paramsObj.pageNum = vm.currentPage - 1;
                //     vm.paramsObj.pageSize = vm.pageSize;
                //     vm.paramsObj.sortCol = vm.sortCol;
                //     vm.paramsObj.sortDir = vm.sortDir;
                //     vm.paramsObj.inventoryNumber = vm.searchParams.inventoryNumber;
                //     vm.paramsObj.inventoryStatus = vm.searchParams.quoteStatus;
                //     vm.paramsObj.resellerName = vm.searchParams.resellerName;

                // }

                // // search function
                // function findInventory() {
                //     vm.currentPage = 1;
                //     vm.getInventory();
                // }

                // function pageChanged() {
                //     logger.log('Page Changed to ' + vm.currentPage);
                //     vm.getInventory();
                // }

                // function pageSizeChanged() {
                //     logger.log('Page Size Changed to ' + vm.pageSize);
                //     vm.currentPage = 1;
                //     vm.getInventory();
                // }

                // function  populateCriteriaFromStorage(storedObj) {

                //     vm.currentPage = parsInt(storedObj.pageNum) + 1;
                //     vm.pageSize = storedObj.pageSize;
                //     vm.sortCol = storedObj.sortCol;
                //     vm.sortDir = storedObj.sortDir;
                //     vm.searchParams.inventoryNumber = storedObj.inventoryNumber;
                //     vm.searchParams.inventoryStatus = storedObj.inventoryStatus;
                //     vm.searchParams.resellerName  = storedObj.resellerName;

                // }

        function editlinemodal(id){

            var inventory = id;
            logger.info(inventory);

            /* Modal */
            var modalInstance = $modal.open({
                templateUrl: 'editModalContent.html',
                controller: 'ModalEditLineCtrl',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    inventory: function(){
                        return inventory;
                    }
                }
            });

        }

        function addlinemodal(){
            /* Modal */
            var modalInstance = $modal.open({
                templateUrl: 'addModalContent.html',
                controller: 'ModalAddLineCtrl',
                controllerAs: 'vm',
                size: 'md'
                // resolve: {

                // }
                
            });

        }


    }

    function gotoitem(c) {
        // $state.go('item.detail', {
        //     id: c.id
        // });
    }

    /* Edit Line Modal */
    angular
        .module('app.inventory')
        .controller('ModalEditLineCtrl', function ($modalInstance, inventory, inventoryService){

            var vm = this;
            vm.inventory = inventory;
            //vm.getSpecificItem = getSpecificItem;
            //vm.saveline = saveline;
            vm.cancel = cancel;


            function cancel(){
                $modalInstance.dismiss('cancel');
            }

            // save specific line

        });

    /* Add New Line Modal */
    angular
        .module('app.inventory')
        //.controller('ModalAddLineCtrl', function ($modalInstance, inventoryId, inventoryService){
        .controller('ModalAddLineCtrl', function ($modalInstance, inventoryService){

            var vm = this;
            vm.myItem = {};
            vm.addInventoryitem = addInventoryitem;
            //vm.inventoryId = inventoryId;

            vm.cancel = cancel;


            function addInventoryitem(myItem){

                var itemArray = [];
                itemArray.push(vm.item);
                var myItem = vm.item;

                return inventoryService.addItem(myItem, vm.inventoryId)
                    .then(function(){

                        // Refresh Inventory List
                        //vm.inventoryId.push(myItem);

                        // Close Modal
                        $modalInstance.close(myItem);


                    });              
            }

            function cancel(){
                $modalInstance.dismiss('cancel');
            }


        });        


})();



