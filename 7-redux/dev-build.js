var path = require('path');
var DevBuilder = require('jspm-dev-builder');
var chokidar = require('chokidar');

var appBuilder = new DevBuilder({
  expression: path.join(__dirname, 'app'),
  outLoc: path.join(__dirname, 'build', 'bundle.js'),
  buildOptions: {
    sfx: false,
    minify: false,
    mangle: false,
    sourceMaps: true
  }
});

appBuilder.build();

chokidar.watch('app').on('change', function() {
  appBuilder.build('app');
});
