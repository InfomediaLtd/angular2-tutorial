module.exports = function (config) {
    config.set({
        
        basePath: '',
        frameworks: ['jspm', 'jasmine'],
        plugins: [
            // 'karma-uiuxengineering-jspm',
          'karma-jspm',
          'karma-jasmine',
        //   'karma-mocha-reporter',
          'karma-chrome-launcher',
        //   'karma-phantomjs-launcher',
          // 'karma-phantomjs2-launcher',
        ],

        jspm: {
            serveFiles: ['app/**/*.+(ts|js|html|css)', 'test/**/*.spec.ts'],
            // serveFiles: ['app/**/*.+(ts|js|html|css)'],
            //loadFiles: ['app/**/*.js', 'test/**/*.spec.ts'],
            // loadFiles: ['test/sanity-test.spec.ts','test/app/data/*.spec.ts','test/app/views/label-with-value.spec.ts'],
            // loadFiles: ['test/sanity-test.spec.ts','test/app/data/*.spec.ts'],
            // files: ['app/**/*.+(ts|js|html|css)', 'test/**/*.spec.ts'],
            // config: 'config.js',
            // packages: "jspm_packages",
            // stripExtension: true,
            // useBundles: true,
            // testWrapperFunctionName: 'main',
        },

        proxies: {
            '/jspm_packages': '/base/jspm_packages',
            '/node_modules': '/base/node_modules',
            "/app": "/base/app",
            "/test": "/base/test",
        },

        // list of files / patterns to load in the browser
        files: [
            // 'test/sanity-test.spec.ts',
            //{pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: false},
            //{pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true},

            //{pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false},
            
        //    'node_modules/es6-shim/es6-shim.min.js',
        //    'node_modules/reflect-metadata/Reflect.js',

        //    'node_modules/process/browser.js',

            // 'node_modules/zone.js/dist/async-test.js',
            // 'node_modules/zone.js/dist/fake-async-test.js',
            // 'node_modules/zone.js/dist/jasmine-patch.js',

            // 'node_modules/zone.js/dist/zone.js',
            // 'node_modules/zone.js/dist/long-stack-trace-zone.js',
            // 'node_modules/zone.js/dist/async-test.js',
            // 'node_modules/zone.js/dist/fake-async-test.js',
            // 'node_modules/zone.js/dist/sync-test.js',
            // 'node_modules/zone.js/dist/proxy.js',
            // 'node_modules/zone.js/dist/jasmine-patch.js',

        //    'node_modules/zone.js/dist/zone.js',
        //    'node_modules/@angular/core/bundles/core-testing.umd.js',

            
        //    'node_modules/systemjs/dist/system.src.js',
        //    'config.js',
            
//            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', included: true, watched: false}, // PhantomJS
            //{pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false}, // PhantomJS & PhantomJS2
           {pattern: 'test/karma-test-shim.js', included: true, watched: false},

            // {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
            // {pattern: 'node_modules/angular2/bundles/http.dev.js', included: true, watched: true},
            // {pattern: 'node_modules/typescript/lib/typescript.js', included: true, watched: false},
            // {pattern: 'jspm_packages/system.src.js', included: true, watched: false},
            // {pattern: 'jspm_packages/system-polyfills.js', included: true, watched: false}, // PhantomJS2

            // { pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false },
            // { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },

            // 'karma-test-shim.js',
        ],

        proxies: {
            '/app/': '/base/app/',
            '/test/': '/base/test/',
            '/jspm_packages/': '/base/jspm_packages/',
            '/node_modules/': '/base/node_modules/'
        },
        // exclude: [],

        // possible values: 'dots', 'progress', 'mocha', 'coverage' (https://npmjs.org/browse/keyword/karma-reporter)
        // reporters: ['mocha'],

        browsers: ['Chrome'],
        // browsers: ['PhantomJS'],

        // port: 9876,
        // colors: true,
        // logLevel: config.LOG_INFO,
        // autoWatch: false,
        // singleRun: true
    })
};
