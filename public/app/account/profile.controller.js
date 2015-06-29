(function(){
  'use strict'

  angular
    .module('app')
    .controller('profileController', function(mvAuth, identityService, mvNotifier) {

      var vm = this;

    vm.email = identityService.currentUser.username;
    vm.fname = identityService.currentUser.firstName;
    vm.lname = identityService.currentUser.lastName;
    // Address
    if(identityService.currentUser.address[0]) {
      vm.addressStreet = identityService.currentUser.address[0].street;
      vm.addressCity = identityService.currentUser.address[0].city;
      vm.addressState = identityService.currentUser.address[0].state;
      vm.addressZipCode = identityService.currentUser.address[0].zipCode;
    }
    // Account/ Billing
    if(identityService.currentUser.billing[0]) {
      vm.accountType = identityService.currentUser.billing[0].accountType;
      vm.accountContactName = identityService.currentUser.billing[0].accountContact[0].contactName;
      vm.accountContactEmail = identityService.currentUser.billing[0].accountContact[0].contactEmail;
    }

    vm.update = function() {
      var newUserData = {
        username: vm.email,
        firstName: vm.fname,
        lastName: vm.lname,
          address:{
            street: vm.addressStreet
            //city: vm.addressCity,
            //state: vm.addressState,
            //zipCode: vm.addressZipCode
        }

        //billing:[{
        //  accountType: vm.accountType,
        //  accountContact: [{
        //    contactName: vm.accountContactName,
        //    contactEmail: vm.accountContactEmail
        //  }]

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
})();