var gulp = require('gulp');
var less = require('gulp-less');
var suorcemaps = require('gulp-sourcemaps');
var cleancss = new(require("less-plugin-clean-css"))({
  advanced: true
});

gulp.task('css', function() {
  gulp
    .src('public/css-src/**/*.less')
    // .pipe(suorcemaps.init())
    .pipe(less({
      plugins: [cleancss]
    }))
    // .pipe(suorcemaps.write())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function() {
  // not work
  // gulp.watch('public/css-src/**/*.less', ['css']);

  var watcher = gulp.watch('public/css-src/**/*.less',function(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', rebuild css ...');
    gulp.run('css');
  });
});

gulp.task('default', ['css', 'watch']);