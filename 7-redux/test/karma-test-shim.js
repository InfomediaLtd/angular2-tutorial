// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};

System.import('zone.js')
    .then(function() {
        Promise.all([
            // System.import('core-js'),
            // System.import('es6-shim'),
            System.import('reflect-metadata/Reflect.js'),
            System.import('zone.js/dist/async-test.js'),
            System.import('zone.js/dist/long-stack-trace-zone.js'),
            System.import('zone.js/dist/fake-async-test.js'),
            System.import('zone.js/dist/sync-test.js'),
            System.import('zone.js/dist/proxy.js'),
            System.import('zone.js/dist/jasmine-patch.js')
        ])
    })
    .then(function() {
        return Promise.all([
            System.import('@angular/core/testing'),
            System.import('@angular/platform-browser-dynamic/testing')
        ])
    })
    .then(function(providers) {
        var coreTesting = providers[0];
        var browserTesting = providers[1];
        coreTesting.TestBed.initTestEnvironment(
                browserTesting.BrowserDynamicTestingModule,
                browserTesting.platformBrowserDynamicTesting());
    })
    .then(function () {
        return Promise.all(
            Object.keys(window.__karma__.files) // All files served by Karma.
                .filter(onlyAppFiles)
                .filter(onlySpecFiles)
                .map(remapPath)
                .map(function (path) {
                    // console.log("Loading " + path);
                    return System.import(path);
                }))
    })
    .then(function () {
        __karma__.start();
    }, function (error) {
        console.error(error.stack || error);
        __karma__.start();
    });


function onlySpecFiles(path) {
    // console.log("isSpec? " + path);
    return /[_|-|\.]spec\.[j|t]s$/.test(path);
}

function onlyAppFiles(path) {
    // console.log("isApp? " + path);
    return /^\/base\/test/.test(path);
}

function remapPath(path) {
    // console.log("Remapping " + path);
    return path.replace("/base","");
}
