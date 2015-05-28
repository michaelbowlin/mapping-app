// angular.module('app', ['ngResource', 'ngRoute','geocoder-service','highcharts-ng','ui.bootstrap','uiGmapgoogle-maps']);
var animateapp = angular.module('app', ['ngResource', 'ngRoute','geocoder-service','ui.bootstrap','ngAnimate']);

animateapp.config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
      admin: {
        auth: function (mvAuth) {
          return mvAuth.authorizeCurrentUserForRoute('admin')
        }
      },
      user: {
        auth: function (mvAuth) {
          return mvAuth.authorizeAuthenticatedUserForRoute()
        }
      }
    }

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
        templateUrl: '/partials/main/main',
        controller: 'mvMainCtrl'
    })
    .when('/admin/users', {
      templateUrl: '/partials/admin/user-list',
      controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
    })
    .when('/signup', {
      templateUrl: '/partials/account/signup',
      controller: 'mvSignupCtrl'
    })
    .when('/profile', {
      templateUrl: '/partials/account/profile',
      controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
    })
    .when('/map', {
      templateUrl: '/partials/map/map',
      controller: 'Map'
    })
    .when('/courses', {
      templateUrl: '/partials/courses/course-list',
      controller: 'mvCourseListCtrl'
    })
    .when('/courses/:id', {
      templateUrl: '/partials/courses/course-details',
      controller: 'mvCourseDetailCtrl'
    })
    .when('/properties', {
      templateUrl: '/partials/properties/property-list',
      controller: 'propertyListCtrl'
    })
    .when('/properties/:id', {
      templateUrl: '/partials/properties/property-details',
      controller: 'propertyDetailCtrl'
    })

});


angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  })
})


