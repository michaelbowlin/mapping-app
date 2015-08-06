(function() {
  'use strict';

  angular
    .module('app')
    .directive('uiGridProperties', function() {

      return {
        restrict: 'E',
        templateUrl: '/app/widgets/ui-grid.template.html',
        scope: {
          refreshMap: '&'
        },
        controller: function($scope, $http, uiGridConstants, $interval, $q, 
          $timeout, propertyManager) {
          /* UI GRID */
          var fakeI18n = function(title) {
            var deferred = $q.defer();
            $interval(function() {
              deferred.resolve('col: ' + title);
            }, 1000, 1);
            return deferred.promise;
          };

          var vm = this;

          var paginationOptions = {
            pageNumber: 1,
            pageSize: 25,
            sort: null
          };

          vm.gridOptions = { //FIXME: make this reusable
            enableFullRowSelection: true,
            exporterMenuCsv: false,
            enableGridMenu: true,
            gridMenuTitleFilter: fakeI18n,
            multiSelect: false,
            paginationPageSizes: [1, 3, 75],
            paginationPageSize: 5,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [{
                name: 'type',
                width: 100,
                cellClass: 'type'
              }, {
                name: 'dateComplete',
                cellClass: 'dateComplete',
                width: 200,
                enableSorting: false
              }, {
                name: 'address',
                width: 500,
                cellClass: 'address',
                enableSorting: false
              }, {
                name: 'improvementSize',
                width: 200,
                cellClass: 'improvementSize',
                enableSorting: false
              }, {
                name: 'improvementSizeType',
                width: 200,
                cellClass: 'acres',
                enableSorting: false
              }, {
                name: 'condition',
                width: 200,
                cellClass: 'condition',
                enableSorting: false
              }, {
                name: 'edit',
                cellClass: 'edit',
                width: 100,
                //cellTemplate: '<button class="btn btn-info btn-sm" ng-click=""><i class="fa fa-edit"></i></button>'
                cellTemplate: '<a href="#"> EDIT </a>'
              }, {
                name: 'delete',
                cellClass: 'delete',
                width: 100,
                // cellTemplate: '<button class="btn btn-danger btn-sm" ng-click=""><i class="fa fa-remove"></i></button>'
                //cellTemplate: '<a href> DELETE </a>'
                // cellTemplate: '<delete-property></delete-property>'
                // cellTemplate: '<a class="" ng-click="deleteProperty()"><i class="fa fa-remove"></i></a>'
                cellTemplate: '<a ng-click="grid.appScope.Delete(row)"> DELETE </a>'
              }

            ],
            gridMenuCustomItems: [{
              title: 'Rotate Grid',
              action: function($event) {
                this.grid.element.toggleClass('rotated');
              },
              order: 210
            }],

            onRegisterApi: function(gridApi) {
              // $scope.gridApi = gridApi;
              vm.gridApi = gridApi;

              gridApi.selection.on.rowSelectionChanged($scope, function() {
                  console.log(gridApi.selection.getSelectedRows());
                  // $scope.openInfoWindow = function(e, selectedMarker){

                })
                // TODO: Took this out because it was throwing an error 


              gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                if (sortColumns.length == 0) {
                  paginationOptions.sort = null;
                } else {
                  paginationOptions.sort = sortColumns[0].sort.direction;
                }
                getPage();
              });

              gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                getPage();
              });

              // interval of zero just to allow the directive to have initialized
              $interval(function() {
                gridApi.core.addToGridMenu(gridApi.grid, [{
                  title: 'Dynamic item',
                  order: 100
                }]);
              }, 0, 1);

              gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
                $scope.columnChanged = {
                  name: changedColumn.colDef.name,
                  visible: changedColumn.colDef.visible
                };
              });
            }
          };

          var getPage = function() {
            // var url;
            // switch ( paginationOptions.sort ) {
            //   //case uiGridConstants.ASC:
            //   //  //  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
            //   //  // url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
            //   //  url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
            //   //  break;
            //   //case uiGridConstants.DESC:
            //   //  // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
            //   //  // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
            //   //  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
            //   //  break;
            //   default:
            //   // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
            //   // url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
            //     url = '/api/properties/';
            //   break;
            // }

            // $http.get(url)
            //   .success(function(data) {
            //     console.log(data);
            //     vm.gridOptions.totalItems = 100;
            //     var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            //     vm.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);

            //   });
            var a = propertyManager.getProperties().then(function(response){});
              console.log(a);
              // vm.gridOptions.totalItems = 100;
              // var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
              // vm.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
            // });
            // console.log(data);
            //   vm.gridOptions.totalItems = 100;
            //   var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            //   vm.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
            
          };

          getPage();

          vm.Delete = function(row) {
            /* deletes row */
            var index = vm.gridOptions.data.indexOf(row.entity);
            var id = row.entity._id;
            vm.gridOptions.data.splice(index, 1);

            /* delete item */
            //propertyManager.createProperty(newPropertyData).then(refreshView());
            propertyManager.deleteProperty(id).then(refreshView());
          };

          function refreshView() {
            $scope.refreshMap()();
          }

        }
      }


    });

})();
