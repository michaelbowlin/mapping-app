angular
  .module('app')
  .controller('userListController', function(mvUser) {
  
  var vm = this;
  vm.users = mvUser.query();
});