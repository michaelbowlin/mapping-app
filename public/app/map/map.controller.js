(function(){
    'use strict'

    angular
        .module('app')
        .controller('mapController', Map);

        function Map(propertyService,$scope,$http){

            var vm = this;
            vm.markers = [];

            /* MAPPING */
            vm.paintMap = function() {

                propertyService.query().$promise.then(function (data) {
                    console.log(data);

                    if(data && data.length){
                        createMap(data);
                    }
                });
            };

            vm.paintMap();


            function createMap(cities) {
                var mapOptions = {
                    zoom: 4,
                    center: new google.maps.LatLng(40.0000, -98.0000),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }

                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                var infoWindow = new google.maps.InfoWindow();

                for (var i = 0; i < cities.length; i++) {
                    createMarker(cities[i]);
                }
            }

            function createMarker(info) {
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.latCoord, info.longCoord),
                    title: info.city
                });

                marker.content = '<div class="infoWindowContent">' + info.description + '</div>';
                var infoWindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });

                vm.markers.push(marker);
            }

            /* GRID */

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

            vm.paintGrid = function(){
                //$scope.gridApi.core.refresh();
                $http.get('/api/properties/')
                    .success(function(data) {
                        $scope.gridOptions.totalItems = 100;
                        var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                        $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
                    });
            };



        }
})();
