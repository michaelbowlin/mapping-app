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
        'app.analytics',
        'app.marketing',

        /* Feature areas */
        'app.dashboard',
        'app.inventory',
        'app.dashboard',
        'app.layout'
         /* ng-starter additions */
        // 'geocoder-service',
        // 'highcharts-ng',
        // 'ui.bootstrap',
        // 'uiGmapgoogle-maps'        
    ]);

})();

 