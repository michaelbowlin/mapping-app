(function(){
    'use strict';

    angular
        .module('app')
        .directive('googlePlaces', function(){
            return {
                restrict:'E',
                scope: {
                    address: '=',
                    lat: '=',
                    lon: '='
                },
                link: function($scope, elm, attrs){
                    var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        var place = autocomplete.getPlace();
                        $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();


                        if ($scope.location === '') {
                            alert('Directive did not update the location property in parent controller.');
                        } else {
                            var fullAddress =  place.formatted_address;
                            var latLon = $scope.location;
                            var res = latLon.split(",");
                            var latitude = res[0];
                            var longitude = res[1];

                            // Put lat/lon/address into scope
                            $scope.lat = latitude;
                            $scope.lon = longitude;
                            $scope.address = fullAddress;

                        }

                        $scope.$apply();


                    });
                }
            }
        });

})();
