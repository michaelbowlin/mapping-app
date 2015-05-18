angular.module('app').controller('userListController', function($scope, mvUser) {
  var vm = this;
  vm.users = mvUser.query();
});