// Karma configuration
// Generated on Mon Jun 27 2016 09:47:51 GMT-0300 (BRT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'public/assets/libs/jquery/jquery-2.2.1.min.js',
            'public/assets/libs/angular/angular.js',
            'public/assets/libs/angular/angular-route.js',
            'public/assets/libs/angular/angular-resource.js',
            'public/assets/libs/angular/angular-mocks.js',
            'public/assets/libs/ui-router/angular-ui-router.js',
            'public/assets/libs/angular/angular-resource.min.js',
            'public/assets/libs/angular/angular-sanitize.min.js',
            'public/assets/libs/plugins/oclazyload/dist/ocLazyLoad.min.js',
            'public/assets/libs/bootstrap/ui-bootstrap-tpls-0.12.0.min.js',
            'public/assets/libs/plugins/angular-notify/*.js',
            'public/app/app.module.js',
            'public/app/config/params.js',
            'public/app/app.route.js',
            'public/app/shared/*js',
            'public/app/components/cart/*.js',
            'public/app/components/order/*.js',
            'public/app/components/developer/*.js',
            'public/app/shared/main/*.js',
            "public/tests/*.js"
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    })
};