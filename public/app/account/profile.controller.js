angular
  .module('app')
  .controller('profileController', function(mvAuth, identityService, mvNotifier) {

    var vm = this;

  vm.email = identityService.currentUser.username;
  vm.fname = identityService.currentUser.firstName;
  vm.lname = identityService.currentUser.lastName;
  // Address
  vm.address = identityService.currentUser.address[0].street;
  vm.addressCity = identityService.currentUser.address[0].city;
  vm.addressState = identityService.currentUser.address[0].state;
  vm.addressZipCode = identityService.currentUser.address[0].zipCode;
  // Account/ Billing
  vm.accountType = identityService.currentUser.billing[0].accountType;
  vm.accountContactName = identityService.currentUser.billing[0].accountContact[0].contactName;
  vm.accountContactEmail = identityService.currentUser.billing[0].accountContact[0].contactEmail;

  vm.billing = identityService.currentUser.billing;

  console.log(vm.addressZipCode);
  console.log(vm.billing);

  vm.update = function() {
    var newUserData = {
      username: vm.email,
      firstName: vm.fname,
      lastName: vm.lname,
      address:[{
        street: vm.address.street,
        city: vm.address.city,
        state: vm.address.state,
        zipCode: vm.address.zipCode
      }],
      billing:[{
        accountType: vm.acctountType,
        accountContact: [{
          contactName: vm.accountContact.name,
          contactEmail: vm.accountContact.email
        }]
      }]
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