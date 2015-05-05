(function () {
    'use strict';

    angular
        .module('app.validations')
        .controller('Validations', Validations);

    /* @ngInject */
    function Validations($state, dataservice, logger, $modal, $scope) {
        var vm = this;
        vm.validationmodal = validationmodal;
        vm.title = 'Form Validations';
        activate();

        function activate() {

        }

        function validationmodal() {

            /* Modal */
            var modalInstance = $modal.open({
                templateUrl: 'validationForm.html',
                controller: 'ModalValidations',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    studyline: function () {
                        return vm.studyline;
                    }
                }
            });
        }
    }

    /* Form Validation Modal */
    angular.module('app.validations')
        .controller('ModalValidations', function ($scope, $modalInstance) {
            var vm = this;
            vm.cancel = cancel;

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            function cancel() {
                $modalInstance.dismiss('cancel');
            }
        });
})();
