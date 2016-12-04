module.exports = function (config) {
    config.set({
        frameworks: ['jspm', 'jasmine'],
        plugins: ['karma-jspm', 'karma-jasmine', 'karma-chrome-launcher', 'karma-mocha-reporter',],
        jspm: {serveFiles: ['app/**/*.+(ts|js|html|css)', 'test/**/*.spec.ts'],},
        files: ['test/karma-test-shim.js',],
        reporters: ['mocha'],
        browsers: ['Chrome'],
    })
};
