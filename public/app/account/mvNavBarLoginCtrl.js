(function(){
  'use strict';

  angular
      .module('app')
      .controller('mvNavBarLoginCtrl', function($scope, $http, identityService, mvNotifier, mvAuth, $location) {
        $scope.identity = identityService;
        $scope.signin = function(username, password) {
          mvAuth.authenticateUser(username, password).then(function(success) {
            if(success) {
             // mvNotifier.notify('You have successfully signed in!');
            } else {
              mvNotifier.notify('Username/Password combination incorrect');
            }
          });
        }

        $scope.signout = function() {
          mvAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
          })
        }
      });

})();
