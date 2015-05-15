angular
  .module('app')
  .controller('signupController', function ($scope, mvUser, mvNotifier, $location, mvAuth) {

    var vm = this;

    vm.signup = function () {
      var newUserData = {
        username: vm.email,
        password: vm.password,
        firstName: vm.fname,
        lastName: vm.lname
      };

      mvAuth.createUser(newUserData).then(function () {
        mvNotifier.notify('User account created!');
        $location.path('/');
      }, function (reason) {
        mvNotifier.error(reason);
      })
    }
  });