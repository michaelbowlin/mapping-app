(function(){
    'use strict';

    angular
        .module('app')
        .controller('dashboardCtrl', dashboardCtrl);

    function dashboardCtrl(mvCachedCourses, cachedPropertiesService,$scope) {
        var vm = this;

        vm.courses = mvCachedCourses.query();
        vm.properties = cachedPropertiesService.query();


        /* Highchart - Line Chart */
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

        /* Highchar - Pie Chart - http://codepen.io/brunoscopelliti/pen/zIstF */

        $scope.type = 'Browser Market Share';

        $scope.initData = function () {
            $scope.data = [
                ['Chrome', 47.0],
                ['Firefox', 33.0],
                ['IE', 20.0]
            ];
        }

        $scope.utopia = function () {
            $scope.data = [
                ['Chrome', 99.0],
                ['Firefox', 1.0],
                ['IE', 0.0]
            ];
        }

        $scope.initData();

    };


    /* Directives */
    angular
        .module('app')
        .directive('drawPieChart', function () {
            // return the directive link function. (compile function not needed)
            return function (scope, element, attrs) {

                var container = $(element).attr("id");

                // watch the expression, and update the UI on change.
                scope.$watch('data', function () {
                    drawPlot();
                }, true);

                var broken = function () {
                    scope.data = [
                        ['Chrome', 33.3],
                        ['Firefox', 33.3],
                        ['IE', 33.3]
                    ];
                };

                var nightmare = function () {
                    scope.$apply(function () {
                        scope.data = [
                            ['Chrome', 0.0],
                            ['Firefox', 1.0],
                            ['IE', 99.0]
                        ];
                    });
                };

                var drawPlot = function () {
                    var chart;
                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: container
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: ''
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                            percentageDecimals: 1
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'Browser share',
                            data: scope.data
                        }]
                    });
                }

                $("#nightmare").on('click', nightmare);
                $("#broken").on('click', broken);

            }
        });

})();


