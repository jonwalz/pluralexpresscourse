var gulp = require('gulp');
var jshint = require('jshint');

gulp.task('style', function(){
    gulp.src(jsFiles)
        .pipe(jshint)

});