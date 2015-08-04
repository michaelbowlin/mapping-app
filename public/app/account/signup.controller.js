angular
  .module('app')
  .controller('signupController', function(mvUser, mvNotifier, $location, mvAuth) {

    var vm = this;

    vm.signup = function(newUser) {
      var newUserData = {
        username: newUser.email,
        password: newUser.password,
        firstName: newUser.fname,
        lastName: newUser.lname
      };

      mvAuth.createUser(newUserData).then(function() {
        mvNotifier.notify('User account created!');
        $location.path('/profile');
      }, function(reason) {
        mvNotifier.error(reason);
      })
    }

    // Close Lightbox TODO: duplicating close lightbox event. need to combine two
    $('.close-lightbox').on('click', function() {
      $(this).closest('.right-lightbox').removeClass('launch-lightbox');
      $(this).closest('.top-lightbox').removeClass('launch-lightbox');
      if (!$('.right-lightbox').hasClass('launch-lightbox')) {
        setTimeout(function() {
          $('.lightbox-container').removeClass('launch-lightbox');
        }, 200);
      }
    });

  });
