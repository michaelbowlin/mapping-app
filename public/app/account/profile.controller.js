angular
  .module('app')
  .controller('profileController', function(mvAuth, identityService, mvNotifier) {

    var vm = this;

  vm.email = identityService.currentUser.username;
  vm.fname = identityService.currentUser.firstName;
  vm.lname = identityService.currentUser.lastName;
  vm.street = identityService.currentUser.address.street;

  vm.update = function() {
    var newUserData = {
      username: vm.email,
      firstName: vm.fname,
      lastName: vm.lname
    }
    if(vm.password && vm.password.length > 0) {
      newUserData.password = vm.password;
    }

    mvAuth.updateCurrentUser(newUserData).then(function() {
      mvNotifier.notify('Your user account has been updated');
    }, function(reason) {
      mvNotifier.error(reason);
    })
  }
})