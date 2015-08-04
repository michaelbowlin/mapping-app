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
      controllerAs: "property",
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
            vm.ddlStates = response.data["State"].list;
            vm.ddlProductType = response.data["Product Type"].list;
            vm.ddlPropertyTypeCategory = response.data["Property Type: Categories"].list;
            vm.ddlPropertyTypeLand = response.data["Property Type: Land"].list;
            vm.ddlPropertyTypeIndustrial = response.data["Property Type: Industrial"].list;
            vm.ddlPropertyTypeOffice = response.data["Property Type: Office"].list;
            vm.ddlPropertyTypeRetail = response.data["Property Type: Retail"].list;
            vm.ddlPropertyTypeMultiFamily = response.data["Property Type: Multi-Family"].list;
            vm.ddlPropertyTypeHotel = response.data["Property Type: Hotel"].list;
            vm.ddlPropertyTypeSpecialPurpose = response.data["Property Type: Special Purpose"].list;
            vm.ddlImprovementSize = response.data["Improvement Size"].list;
            vm.ddlImprovementSizeMultiFamily = response.data["Improvement Size: Multi-Family"].list; 
            vm.ddlLandSize = response.data["Land Size"].list;
            vm.ddlRelevantCondition = response.data["Relevant Condition"].list;            
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
          var improvementSize, propertyType;
          console.log(newProp);

          if( newProp.improvementSize ){
            improvementSize = newProp.improvementSize;
          } else if( newProp.improvementSizeMulti ){
            improvementSize = newProp.improvementSizeMulti;
          } else if( newProp.landSize ){
            improvementSize = newProp.landSize;
          } else {
            improvementSize = "";
          };

          if( newProp.propertyTypeLand ){
            propertyType = newProp.propertyTypeLand;
          } else if( newProp.propertyTypeIndustrial ){
            propertyType = newProp.propertyTypeIndustrial;
          } else if( newProp.propertyTypeOffice ) {
            propertyType = newProp.propertyTypeOffice;
          } else if( newProp.propertyTypeRetail ) {
            propertyType = newProp.propertyTypeRetail;
          } else if( newProp.propertyTypeMulti ) {
            propertyType = newProp.propertyTypeMulti;
          } else if( newProp.propertyTypeHotel ) {
            propertyType = newProp.propertyTypeHotel;
          } else if( newProp.propertyTypeSpecial ) {
            propertyType = newProp.propertyTypeSpecial;
          } else {
            propertyType = "";
          };

          var newPropertyData = {
            title: newProp.title,
            productType: newProp.productType,
            propertyTypeCategory: newProp.propertyTypeCategory,
            propertyType: propertyType,            
            address: newProp.address,
            latCoord: newProp.latCoord,
            longCoord: newProp.longCoord,
            improvementSize: improvementSize,
            relevantCondition: newProp.relevantCondition,
            relevantCondition2: newProp.relevantCondition2,
            relevantCondition3: newProp.relevantCondition3,
            relevantCondition4: newProp.relevantCondition4,
            dateComplete: newProp.dateComplete,
            userAccount: identityService.currentUser._id
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
