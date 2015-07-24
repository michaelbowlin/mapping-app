(function() {
  'use strict';

  angular
    .module('app')
    .directive('mpCoLbAddprop', mpCoLbAddprop);

  function mpCoLbAddprop() {
    return {
      restrict: 'E',
      templateUrl: '/app/widgets/lightbox-addproperty.html',
      scope: {
        refreshMap: '&',
        refreshGrid: '&'
      },
      link: function(scope, element, attrs) {

      },
      controller: function($scope,
        $location,
        identityService,
        mvNotifier,
        propertyManager,
        $http,
        cachedDropDownListService,
        dropDownListService,
        $q,
        $resource) {
        var vm = this;

        vm.getLists = function() {
          
          cachedDropDownListService.getLists().then(function(response) {
            vm.ddlStates = response.data[0].list;
            vm.ddlProductType = response.data[1].list;
            vm.ddlPropertyTypeCategory = response.data[2].list;
            vm.ddlPropertyTypeLand = response.data[3].list;
            vm.ddlPropertyTypeIndustrial = response.data[4].list;
            vm.ddlPropertyTypeOffice = response.data[5].list;
            vm.ddlPropertyTypeRetail = response.data[6].list;
            vm.ddlPropertyTypeMultiFamily = response.data[7].list;
            vm.ddlPropertyTypeHotel = response.data[8].list;
            vm.ddlPropertyTypeSpecialPurpose = response.data[9].list;
            vm.ddlImprovementSize = response.data[10].list;
            vm.ddlImprovementSizeMultiFamily = response.data[11].list; 
            vm.ddlLandSize = response.data[12].list;
            vm.ddlRelevantCondition = response.data[13].list;            
            
            console.log(vm.ddlStates);
          });

        }
        vm.getLists();

        /* DATE PICKER */
        $scope.today = function() {
          $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
          $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
          return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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

        vm.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events = [{
          date: tomorrow,
          status: 'full'
        }, {
          date: afterTomorrow,
          status: 'partially'
        }];

        $scope.getDayClass = function(date, mode) {
          if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
              var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

              if (dayToCheck === currentDay) {
                return $scope.events[i].status;
              }
            }
          }

          return '';
        };


        vm.addProperty = function(newProp) {

          var newPropertyData = {
            title: newProp.title,
            propertyType: newProp.propertyType,
            dateComplete: newProp.dateComplete,
            address: newProp.address,
            improvementSize: newProp.improvementSize,
            improvementSizeMultiFamily: newProp.improvementSizeMultiFamily,
            improvementSizeType: newProp.improvementSizeType,
            latCoord: newProp.latCoord,
            longCoord: newProp.longCoord,
            relevantCondition: newProp.relevantCondition,
            state: newProp.state,
            productType: newProp.productType,
            landSize: newProp.landSize
              //userAccount: identityService.currentUser._id TODO: Find out why we need this
          };

          propertyManager.createProperty(newPropertyData).then(refreshView());

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

        function refreshView() {

          $scope.refreshMap()();
          $scope.refreshGrid()();

          mvNotifier.notify('New Property Added!');

          // $location.path('/map');

          //  , function (reason) {
          //  alert(reason);
          //  mvNotifier.error(reason);
          //
          //}


        }

      }
    }
  };


})();
