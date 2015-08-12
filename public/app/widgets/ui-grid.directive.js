(function() {
  'use strict';

  angular
      .module('app')
      .directive('uiGridProperties', function() {

        return {
          restrict: 'E',
          templateUrl: '/app/widgets/ui-grid.template.html',
          scope: {
            refreshMap: '&',
            fillForm: '&'
          },
          controller: function($scope, $http, uiGridConstants, $interval, $q, $timeout, propertyManager) {
            /* UI GRID */
            var fakeI18n = function(title) {
              var deferred = $q.defer();
              $interval(function() {
                deferred.resolve('col: ' + title);
              }, 1000, 1);
              return deferred.promise;
            };

            var paginationOptions = {
              pageNumber: 1,
              pageSize: 25,
              sort: null
            };

            $scope.gridOptions = { //FIXME: make this reusable
              enableFullRowSelection: true,
              exporterMenuCsv: false,
              enableGridMenu: true,
              gridMenuTitleFilter: fakeI18n,
              multiSelect: false,
              paginationPageSizes: [1, 3, 75],
              paginationPageSize: 5,
              useExternalPagination: true,
              useExternalSorting: true,
              columnDefs: [
                {
                  displayName: 'Type',
                  name: 'propertyType',
                  cellClass: 'propertyType',
                  enableSorting: false
                },
                {
                  displayName: 'Date',
                  name: 'dateComplete',
                  cellClass: 'dateComplete',
                  cellFilter: 'date:\'MM-dd-yyyy\'',
                  width: 100,
                  enableSorting: true
                },
                {
                  displayName: 'Address',
                  name: 'address[0]',
                  width: 310,
                  cellClass: 'address',
                  enableSorting: false
                },
                {
                  displayName: 'Type',
                  name: 'productType',
                  width: 240,
                  cellClass: 'type'
                },
                {
                  name: 'productType',
                  displayName: 'Product',
                  cellClass: 'productType',
                  enableSorting: false
                },
                {
                  field: 'relevantCondition',
                  displayName: 'Condition 1',
                  //cellTemplate: 'relevantCondition2',
                  cellClass: 'relevantCondition',
                  enableSorting: false
                },
                {
                  field: 'relevantCondition2',
                  displayName: 'Condition 2',
                  //cellTemplate: 'relevantCondition2',
                  cellClass: 'relevantCondition',
                  enableSorting: false
                },
                {
                  field: 'relevantCondition3',
                  displayName: 'Condition 3',
                  //cellTemplate: 'relevantCondition2',
                  cellClass: 'relevantCondition',
                  enableSorting: false
                },
                {
                  field: 'relevantCondition4',
                  displayName: 'Condition 4',
                  //cellTemplate: 'relevantCondition2',
                  cellClass: 'relevantCondition',
                  enableSorting: false
                },


                {
                  name: 'edit',
                  displayName: '',
                  cellClass: 'edit',
                  width: 40,
                  cellTemplate: '<edit-property-button></edit-property-button>'
                }, {
                  name: 'delete',
                  displayName: '',
                  cellClass: 'delete',
                  width: 40,
                  cellTemplate: '<span class="col-xs-1 margin-auto" ng-click="grid.appScope.Delete(row)"><p></p><i class="fa fa-trash"></i></span>'
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
                $scope.gridApi = gridApi;
                /*
                 gridApi.selection.on.rowSelectionChanged($scope, function(){
                 console.log(gridApi.selection.getSelectedRows());
                 // $scope.openInfoWindow = function(e, selectedMarker){

                 })TODO: Took this out because it was throwing an error */


                $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
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
              var url;
              switch (paginationOptions.sort) {
                //case uiGridConstants.ASC:
                //  //  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
                //  // url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
                //  url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
                //  break;
                //case uiGridConstants.DESC:
                //  // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                //  // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                //  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
                //  break;
                default:
                  // url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
                  // url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
                  url = '/api/properties/';
                  break;
              }

              $http.get(url)
                  .success(function(data) {
                    console.log(data);
                    var condtion = data[0].relevantCondition;
                    $scope.gridOptions.totalItems = 100;
                    var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                    $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);

                  });
            };

            getPage();

            $scope.Delete = function(row) {
              /* deletes row */
              var index = $scope.gridOptions.data.indexOf(row.entity);
              var id = row.entity._id;
              $scope.gridOptions.data.splice(index, 1);

              /* delete item */
              //propertyManager.createProperty(newPropertyData).then(refreshView());
              propertyManager.deleteProperty(id).then(refreshView());
            };

            function refreshView(){
              $scope.refreshMap()();
            }

            /*
             *
             *  Edit Row
             *
             */
            $scope.editRow = function(row) {
              console.log(row.entity.latCoord);
              //$scope.fillForm = row.entity.latCoord;

              var editData = row.entity;

              updateForm(editData);

              /*
               entity: Object
               $$hashKey: "uiGrid-00L"
               __v: 0
               _id: "559fc0a8a65319da53e68f24"
               address: Array[1]
               dateAdded: "2015-07-10T12:54:20.153Z"
               dateComplete: "2015-07-10T12:54:20.153Z"
               improvementSizeType: "Acres"
               latCoord: 32.1656221
               longCoord: -82.90007509999998
               tags: Array[0]
               title: "Test"
               type: "Commercial"
               */

              /* Edit Row */

              /* Edit Item */

            }

            function updateForm(editData){
              $scope.fillForm()(editData);
            }


          }
        }


      });

})();