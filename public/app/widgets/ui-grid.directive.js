(function(){
    'use strict';

    angular
        .module('app')
        .directive('uiGridProperties',function(){

           return {
               restrict: 'E',
               //template: 'hello',
               templateUrl: '/app/widgets/ui-grid.template.html',
               link: function(scope,element,attrs){

               },
               controller: function($scope, $http, uiGridConstants, $interval, $q){
                   /* UI GRID */
                   var fakeI18n = function( title ){
                       var deferred = $q.defer();
                       $interval( function() {
                           deferred.resolve( 'col: ' + title );
                       }, 1000, 1);
                       return deferred.promise;
                   };

                   var paginationOptions = {
                       pageNumber: 1,
                       pageSize: 25,
                       sort: null
                   };

                   $scope.gridOptions = {
                       exporterMenuCsv: false,
                       enableGridMenu: true,
                       gridMenuTitleFilter: fakeI18n,
                       paginationPageSizes: [1, 3, 75],
                       paginationPageSize: 5,
                       useExternalPagination: true,
                       useExternalSorting: true,
                       columnDefs:[
                           { name: 'type', cellClass: 'type'  },
                           { name: 'dateComplete', cellClass: 'dateComplete' , enableSorting: false },
                           { name: 'address', width: 250,  cellClass: 'address' , enableSorting: false },
                           { name: 'improvementSize', cellClass: 'improvementSize' , enableSorting: false },
                           { name: 'acres', cellClass: 'acres' , enableSorting: false },
                           { name: 'condition', cellClass: 'condition', enableSorting: false },
                           { name: 'edit', cellClass: 'edit', width: 50, cellTemplate: '<button class="btn btn-info btn-sm" ng-click=""><i class="fa fa-edit"></i></button>' },
                           { name: 'delete', cellClass: 'delete', width: 50, cellTemplate: '<button class="btn btn-danger btn-sm" ng-click=""><i class="fa fa-remove"></i></button>' }

                       ],
                       gridMenuCustomItems: [
                           {
                               title: 'Rotate Grid',
                               action: function ($event) {
                                   this.grid.element.toggleClass('rotated');
                               },
                               order: 210
                           }
                       ],
                       onRegisterApi: function( gridApi ){
                           $scope.gridApi = gridApi;
                           $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                               if (sortColumns.length == 0) {
                                   paginationOptions.sort = null;
                               } else {
                                   paginationOptions.sort = sortColumns[0].sort.direction;
                               }
                               getPage();
                           });
                           gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                               paginationOptions.pageNumber = newPage;
                               paginationOptions.pageSize = pageSize;
                               getPage();
                           });
                           // interval of zero just to allow the directive to have initialized
                           $interval( function() {
                               gridApi.core.addToGridMenu( gridApi.grid, [{ title: 'Dynamic item', order: 100}]);
                           }, 0, 1);

                           gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn){
                               $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
                           });
                       }
                   };

                   var getPage = function() {
                       var url;
                       switch(paginationOptions.sort) {
                           //case uiGridConstants.ASC:
                           //	//  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
                           //	// url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
                           //	url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
                           //	break;
                           //case uiGridConstants.DESC:
                           //	// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                           //	// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                           //	url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                           //	break;
                           default:
                               // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
                               // url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
                               url = '/api/properties/';
                               break;
                       }

                       $http.get(url)
                           .success(function (data) {
                               $scope.gridOptions.totalItems = 100;
                               var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                               $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
                           });
                   };

                   getPage();
               }
           }




        });
})();