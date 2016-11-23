module.exports = function (config) {
    config.set({
        frameworks: ['jspm', 'jasmine'],
        plugins: ['karma-jspm', 'karma-jasmine', 'karma-chrome-launcher',],
        jspm: {
            serveFiles: ['app/**/*.+(ts|js|html|css)', 'test/**/*.spec.ts'],
        },
        files: [
            'test/karma-test-shim.js',
        ],
        browsers: ['Chrome'],
    })
};
