var gulp = require("gulp");
var path = require('path');
var DevBuilder = require('jspm-dev-builder');
var chokidar = require('chokidar');
var runSequence = require("run-sequence");

var appBuilder = new DevBuilder({
  expression: path.join(__dirname, "../", 'app'),
  outLoc: path.join(__dirname, "../", 'build', 'bundle.js'),
  buildOptions: {
    sfx: false,
    minify: false,
    mangle: false,
    sourceMaps: true
  }
});

gulp.task("dev-bundle-build", function() {
  var time1 = new Date().getTime();
  return appBuilder.build().then(function() {
    var time2 = new Date().getTime();
    console.log("build took " + (time2-time1) + " ms.")
  });
});
gulp.task("dev-bundle-watch", function() {
  return chokidar.watch('app').on('change', function() {
    var time1 = new Date().getTime();
    return appBuilder.build("app/*").then(function() {
      var time2 = new Date().getTime();
      console.log("build took " + (time2-time1) + " ms.")
    });
  });
});

gulp.task("dev-bundle", function(callback) {
    runSequence(
        "dev-bundle-build",
        "dev-bundle-watch",
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log("FINISHED SUCCESSFULLY");
            }
            callback(error);
        });
});
