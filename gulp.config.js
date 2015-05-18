module.exports = function() {
    var root = './';
    var temp = './.tmp/';
    var nodeModules = 'node_modules';

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        css: 'styles.css',
        sasscss: '_bootstrap.css',
        // app js, with no specs
        js: [
            '**/*.module.js',
            '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        /* sass: 'styles/scss/_bootstrap.scss', */
        sass: 'trash-bootstrap.scss',

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        }

    };


    return config;

    ////////////////

};
