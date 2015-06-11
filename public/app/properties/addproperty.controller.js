//angular
//  .module('app')
//  .controller('addPropertyController', function ($location, identityService, mvNotifier, propertyManager) {
//    var vm = this;
//
//    vm.types = [{Type:'Residential', Type:'Commericial'}]
//
//    vm.addProperty = function () {
//      alert('controller')
//      var newPropertyData = {
//        title: vm.title,
//        type: vm.type,
//        dateComplete: vm.dateComplete,
//        address: vm.address,
//        improvementSize: vm.improvementSize,
//        improvementSizeType: vm.improvementSizeType,
//        latCoord: vm.latCoord,
//        longCoord: vm.longCoord,
//        condition: vm.condition,
//        userAccount: identityService.currentUser._id
//      };
//
//      propertyManager.createProperty(newPropertyData).then(function () {
//        mvNotifier.notify('New Property Added!');
//        $location.path('/properties');
//      }, function (reason) {
//        mvNotifier.error(reason);
//      })
//    }
//  });