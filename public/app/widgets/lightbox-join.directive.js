(function() {
  'use strict';

  angular
    .module('app')
    .directive('mpCoLbJoin', mpCoLbJoin);

  function mpCoLbJoin() {
    return {
      restrict: 'E',
      templateUrl: '/app/widgets/lightbox-join.html',
      controllerAs: 'signup',
      controller: function( $location, mvUser, mvAuth, mvNotifier ) {
        var vm = this;

        vm.signup = function( newUser ) {
          console.log(newUser);
          var newUserData = {
            username: newUser.email,
            password: newUser.password,
            firstName: newUser.fname,
            lastName: newUser.lname
          };

          mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('New account created!');
            $location.path('/profile');
          }, function(reason) {
            mvNotifier.error(reason);
          })

        }

      }
    }
  };


})();
