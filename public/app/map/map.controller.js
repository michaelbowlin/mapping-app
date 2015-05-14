(function() {
    'use strict';

    angular
        .module('app')
        .controller('Map', Map);

    function Map($scope, $window, $log, $q, $modal,  geocoderService, mapService, $http) {
    // function Map($state, logger, $scope, $window, $modal, $log, $q, geocoderService, mapService, $http) {

        var vm = this;

        // vm.setInitialParams = setInitialParams;
        // vm.refreshParamsObj = refreshParamsObj;
        // vm.displayCities = displayCities;
        // vm.getCities = getCities;
        // vm.title = 'Property Map';

        var paramsObj = {};


        activate();

        function activate(){
            init();
        }

        function init(){
            setInitialParams();
            refreshParamsObj();
            sortSelect();
        }

        //initial params for the page
        function setInitialParams() {

            //initial params
            $scope.itemsPerPage =  10;
            $scope.itemsPerPageSkip = 0;
            $scope.maxPaginationSize = 4;
            $scope.currentPage = 1;
            $scope.totalItems = 100; //** NEED - to dynamicly pull this number
            $scope.sortBy = "productType";


            // pageSizes=[10,20,50,100] ;
        }


        var onError = function(reason) {
            $scope.error = "Could not fetch the data";
        };


        function refreshParamsObj(){

            paramsObj.currentPage = $scope.currentPage;
            paramsObj.itemsPerPage = $scope.itemsPerPage;
            paramsObj.itemsPerPageSkip = $scope.itemsPerPageSkip;
            paramsObj.maxPaginationSize = $scope.maxPaginationSize;
            paramsObj.totalItems = $scope.totalItems;
            paramsObj.sortBy = $scope.sortBy;

            // Pass params into Get Cities function
            getCities(paramsObj);

        }

        /* GetCities from Database ===================================*/
        function getCities(paramsObj) {

            var currentPage = paramsObj.currentPage;
            var maxPaginationSize = paramsObj.maxPaginationSize;
            var totalItems = paramsObj.totalItems;
            // var numPages = 3;

            return mapService.getCities(paramsObj)
                .then(function(data){

                    // vm.mapInventory = data;
                    // work arround the UI Bootstrap bug
                    // vm.currentPage = vm.paramsObj.pageNum + 1;
                    //vm.totalInventory = data.totalElements;

                    displayCities(data);
                });

        }

        /* Delete Individual Cities from Database =======================*/
        $scope.deleteItem = function(id) {
            alert('You have deleted: ' + id);

            //*** NEED - to hook into service
            $http.delete("https://dummy-data.azure-mobile.net/tables/data/" + id)
                .then(function(){
                    refreshParamsObj()
                });

        }


        /* Display Cities  ======================================*/
        function displayCities(data) {
            $scope.cities1 = data;
            var cities1 = $scope.cities1;
            console.log(cities1);


            // $scope.markers.push(cities1);
            for (var i = 0; i < cities1.length; i++) {
                // createMarker(cities1[i]);
            }

        }

        /* Display Cities on the map ======================================*/
        //var infoWindow = new google.maps.InfoWindow();

        /* Creat Marker
        var createMarker = function(info) {
            console.log('~~~~~~~~~~~~~~~~ CITIES ' + info)
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lon),
                title: info.city //*** NEED - to make this the title
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

            google.maps.event.addListener(marker, 'click', function() {

                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);

            });

            $scope.markers.push(marker);

        } */

        /* Open Window Event -- TUT: http://jsfiddle.net/pc7Uu/854/
        $scope.openInfoWindow = function(e, selectedMarker) {
            console.log(selectedMarker + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }*/

        /* Map Options
        var mapOptions = {
            zoom: 4,
            scrollwheel: false,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN,

        }


        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.markers = [];*/



        /* Pagination - NG Click ========================================= */
        $scope.pageChanged = function(currentPage) {


            var itemsPerPage = paramsObj.itemsPerPage;

            currentPage =  $scope.currentPage;


            // Formula to determine how many itemsPerPage // page # -1 * 5
            var itemsPerPageSkip = (currentPage - 1) * itemsPerPage;

            // Update the page clicked in the paramsObj
            paramsObj.currentPage = currentPage;
            paramsObj.itemsPerPageSkip = itemsPerPageSkip;

            // Pass in object with relative parameters
            getCities(paramsObj)
        };

        /* Form Select Filter ========================================= */
        function sortSelect(){
            $scope.itemList=[];
            $scope.numberItems=[
                {id:1,name:"1"},
                {id:2,name:"2"},
                {id:3,name:"5"}
            ]

            $scope.changedValue = function(item){
                $scope.itemList.push(item.name);

                // putting item value into two seperate objects
                var itemsPerPage = item.name;
                paramsObj.itemsPerPage = itemsPerPage;
                itemsPerPage = paramsObj.itemsPerPage;

                var currentPage = $scope.currentPage;
                var foo = (currentPage - 1) * itemsPerPage;

                paramsObj.currentPage = currentPage;
                currentPage = paramsObj.currentPage;

                getCities(paramsObj);
            }

        }


        /* UI BOOTSTRAP - MODAL ==========================================================*/
        $scope.open = function () {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent22.html',
                controller: 'ModalInstanceCtrl22',
                size: 'md',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }




    //
    //angular
    //    .module('app')
    //    .controller('ModalInstanceCtrl22', function ($scope, $modalInstance, geocoderService, mapService) {
    //
    //
    //
    //        $scope.ok = function () {
    //            $modalInstance.close($scope.selected.item);
    //        };
    //
    //        $scope.cancel = function () {
    //            $modalInstance.dismiss('cancel');
    //        };
    //
    //
    //        $scope.cancel = function () {
    //            $modalInstance.dismiss('cancel');
    //        };
    //
    //        $scope.clear = function() {
    //            $scope.newprop.dateOfCompletion = null;
    //            // $scope.dt = null;
    //        };
    //
    //        // Disable weekend selection
    //        $scope.disabled = function(date, mode) {
    //            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    //        };
    //
    //        $scope.toggleMin = function() {
    //            $scope.minDate = $scope.minDate ? null : new Date();
    //        };
    //        $scope.toggleMin();
    //
    //        /* Date Picker */
    //        $scope.openDatePicker = function($event) {
    //            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Date Picker' + $event)
    //            $event.preventDefault();
    //            $event.stopPropagation();
    //
    //            $scope.opened = true;
    //            console.log($event)
    //        };
    //
    //        $scope.dateOptions = {
    //            formatYear: 'yy',
    //            startingDay: 1
    //        };
    //
    //        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //        $scope.format = $scope.formats[0];
    //
    //        /* GEO CODER --- Adding Citites ==========================================================*/
    //        //function myGeoCoder() {
    //        $scope.location = '';
    //        $scope.doSearch = function(newprop) {
    //            if ($scope.location === '') {
    //                alert('Directive did not update the location property in parent controller.');
    //            } else {
    //                var latLon = $scope.location;
    //                var res = latLon.split(",");
    //                var latitude = res[0];
    //                var longitude = res[1];
    //
    //                //setting default values for radio buttons
    //                $scope.newprop.level = "Home";
    //                $scope.newprop.level2 = "Good";
    //
    //                var myData = {
    //                    latlon: newprop.latlon,
    //                    desc: 'This is the best city in the world!',
    //                    lat: latitude,
    //                    lon: longitude,
    //                    city: newprop.city,
    //                    productType: newprop.level,
    //                    dateOfCompletion: newprop.dateOfCompletion,
    //                    improvementSize: newprop.improvementSize,
    //                    acres: newprop.acres,
    //                    relevantCondition: newprop.level2
    //
    //                };
    //                //console.log(myData.productType)
    //
    //                return mapService.createCity(myData)
    //                    .then(function(data){
    //                        //displayCities(data); //*** NEED to pass back to controller
    //
    //                        // Close Modal
    //                        $modalInstance.dismiss('cancel');
    //
    //
    //                    })
    //
    //            }
    //
    //
    //
    //        };
    //        // }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //    });






})();
