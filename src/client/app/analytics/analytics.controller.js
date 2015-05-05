(function() {
    'use strict';

    angular
        .module('app.analytics')
        .controller('Analytics', Analytics);

    function Analytics($state, logger, $scope) {
        var vm = this;
        // vm.customers = [];
        // vm.gotoCustomer = gotoCustomer;
        vm.title = 'Analytics';

        activate();

        function activate() {
            // return getCustomers().then(function() {
            //     logger.info('Activated Dashboard View');
            // });
        }


        $scope.addPoints = function () {
            var seriesArray = $scope.highchartsNG.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };

        $scope.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            $scope.highchartsNG.series.push({
                data: rnd
            })
        }

        $scope.removeRandomSeries = function () {
            var seriesArray = $scope.highchartsNG.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1)
        }

        $scope.options = {
            type: 'line'
        }

        $scope.swapChartType = function () {
            if (this.highchartsNG.options.chart.type === 'line') {
                this.highchartsNG.options.chart.type = 'bar'
            } else {
                this.highchartsNG.options.chart.type = 'line'
            }
        }

        $scope.highchartsNG = {
            options: {
                chart: {
                    type: 'bar'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7]
            }],
            title: {
                text: 'Hello'
            },
            loading: false
        }


    }




})();
