angular
  .module('app')
  .controller('addPropertyController', function ($location, propertyService) {

    var vm = this;

    vm.addProperty = function () {
      var newPropertyData = {
        username: vm.email,
        password: vm.password,
        firstName: vm.fname,
        lastName: vm.lname
      };

      propertyService.createproperty(newPropertyData).then(function () {
        mvNotifier.notify('User account created!');
        $location.path('/profile');
      }, function (reason) {
        mvNotifier.error(reason);
      })
    }
  });