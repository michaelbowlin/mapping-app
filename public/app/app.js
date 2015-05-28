// angular.module('app', ['ngResource', 'ngRoute','geocoder-service','highcharts-ng','ui.bootstrap','uiGmapgoogle-maps']);
angular.module('app', ['ngResource', 'ngRoute','geocoder-service','ui.bootstrap','ngAnimate']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
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
      controller: 'main.controller',
      controllerAs: "main"
    })
    .when('/admin/users', {
      templateUrl: '/partials/admin/user-list',
      controller: 'userListController',
      controllerAs: "user",
      resolve: routeRoleChecks.admin
    })
    .when('/signup', {
      templateUrl: '/partials/account/signup',
      controller: 'signupController',
      controllerAs: "signup"
    })
    .when('/profile', {
      templateUrl: '/partials/account/profile',
      controller: 'profileController',
      controllerAs: "profile",
      resolve: routeRoleChecks.user
    })
    .when('/map', {
      templateUrl: '/partials/map/map',
      controller: 'mapController',
      controllerAs: 'map'
    })
    .when('/courses', {
      templateUrl: '/partials/courses/course-list',
      controller: 'mvCourseListCtrl'
    })
    .when('/courses/:id', {
      templateUrl: '/partials/courses/course-details',
      controller: 'mvCourseDetailCtrl'
    })
    .when('/courses/add', {
      templateUrl: '/partials/courses/course-list',
      controller: 'mvCourseListCtrl'
    })
    .when('/properties', {
      templateUrl: '/partials/properties/property-list',
      controller: 'propertyListCtrl',
      controllerAs: 'property'
    })
    .when('/properties/:id', {
      templateUrl: '/partials/properties/property-details',
      controller: 'propertyDetailCtrl',
      controllerAs: 'property'
    })
    .when('/property/add', {
      templateUrl: '/partials/properties/add-property',
      controller: 'addPropertyController',
      controllerAs: "property"
    })

});

angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  })
})
