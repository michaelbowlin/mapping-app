(function() {

    'use strict';

    angular.module('app', [
        /* Shared modules */
        'app.core',
        'app.widgets',

        /* Feature areas */
        'app.home',
        'app.map',
        'app.profile',

        /* Feature areas */
        'app.dashboard',
        'app.layout',
         /* ng-starter additions */
        'geocoder-service',
        // 'highcharts-ng',
        'ngResource',
        'ui.bootstrap',
        'uiGmapgoogle-maps'        
    ]);

})();

 