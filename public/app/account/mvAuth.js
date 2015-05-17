angular.module('app').factory('mvAuth', function($http, identityService, $q, mvUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new mvUser();
          angular.extend(user, response.data.user);
          identitryService.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },

    createUser: function(newUserData) {
      var newUser = new mvUser(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        identityService.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(identityService.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        identityService.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        identityService.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },

    authorizeCurrentUserForRoute: function(role) {
      if(identityService.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },

    authorizeAuthenticatedUserForRoute: function() {
      if(identityService.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});