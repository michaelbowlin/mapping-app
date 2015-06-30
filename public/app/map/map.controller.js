(function(){
    'use strict'

    angular
        .module('app')
        .controller('mapController', Map);

        function Map(propertyService){

            var vm = this;

            vm.removeRes = function() {

                propertyService.query().$promise.then(function (data) {
                    console.log(data);

                    if(data && data.length){
                        vm.cities = data;
                    }
                });
            };

            vm.removeRes();


        }
})();
