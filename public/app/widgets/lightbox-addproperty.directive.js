(function() {
  'use strict';

  angular
    .module('app')
    .directive('mpCoLbAddprop', mpCoLbAddprop);

  function mpCoLbAddprop() {
    return {
      restrict: 'E',
      templateUrl: '/app/widgets/lightbox-addproperty.html',
      link: function(scope, element, attrs) {

      },
      controller: function($scope, $location, identityService, mvNotifier, propertyManager) {
        var vm = this;
        //
        //vm.types = [{Type:'Residential', Type:'Commericial'}]

        /* DATE PICKER */
           $scope.today = function() {
              $scope.dt = new Date();
          };
          $scope.today();

          $scope.clear = function () {
              $scope.dt = null;
          };

          // Disable weekend selection
          $scope.disabled = function(date, mode) {
              return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          $scope.toggleMin = function() {
              $scope.minDate = $scope.minDate ? null : new Date();
          };
          $scope.toggleMin();

          $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
          };

          $scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
          };

          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          $scope.format = $scope.formats[0];

          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 2);
          $scope.events =
              [
                  {
                      date: tomorrow,
                      status: 'full'
                  },
                  {
                      date: afterTomorrow,
                      status: 'partially'
                  }
              ];

          $scope.getDayClass = function(date, mode) {
              if (mode === 'day') {
                  var dayToCheck = new Date(date).setHours(0,0,0,0);

                  for (var i=0;i<$scope.events.length;i++){
                      var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                      if (dayToCheck === currentDay) {
                          return $scope.events[i].status;
                      }
                  }
              }

              return '';
          };


        $scope.addProperty = function(newProp) {

          console.log('title - ' + newProp.title);
          console.log('type - ' + newProp.type);
          console.log('dateComplete - ' + newProp.dateComplete);
          console.log('address - ' + newProp.address);
          console.log('improvementSize - ' + newProp.improvementSize);
          console.log('improvementSizeType - ' + newProp.improvementSizeType);
          console.log('latCoord - ' + newProp.latCoord);
          console.log('longCoord - ' + newProp.longCoord);
          console.log('condition - ' + newProp.condition);
          // console.log('currentUser._id - ' + identityService.currentUser.id);

          var newPropertyData = {
              title: newProp.title,
              type: newProp.type,
              dateComplete: newProp.dateComplete,
              address: newProp.address,
              improvementSize: newProp.improvementSize,
              improvementSizeType: newProp.improvementSizeType,
              latCoord: newProp.latCoord,
              longCoord: newProp.longCoord,
              condition: newProp.condition
              //userAccount: identityService.currentUser._id TODO: Find out why we need this
          };
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + newPropertyData);


          propertyManager.createProperty(newPropertyData).then(function () {
              mvNotifier.notify('New Property Added!');
              $location.path('/properties');
          }, function (reason) {
              mvNotifier.error(reason);
          })

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


        }
      }
    }
  };


})();
