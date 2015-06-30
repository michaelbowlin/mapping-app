//(function(){
//    'use strict';

    angular
        .module('app')
        .directive('arCoMap', arCoMap);

    function arCoMap(){
        return {
            restrict: 'E',
            templateUrl: '/app/widgets/map.html',
            scope: {
                cities: '='
            },
            controller: (function($scope, propertyService){
                var vm = this;


                vm.markers = {};
                $scope.$watch('cities', function(newVal, oldVal){ // FIXME: remove $watch (array)
                    if(newVal && newVal.length){
                        createMap(newVal);
                    }
                });
                // createMap(cities);


                //function getCities() {
                //    alert('Getting Citttties');
                //    vm.cities = propertyService.query().$promise.then(function (data) {
                //        createMap(data);
                //        return data;
                //    });
                //}

                function createMap(cities) {
                    var mapOptions = {
                        zoom: 4,
                        center: new google.maps.LatLng(40.0000, -98.0000),
                        mapTypeId: google.maps.MapTypeId.TERRAIN
                    }

                    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                    vm.markers = [];

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
            })
        };
    };

//})();