const gulp = require('gulp');
const minifyHTML = require('gulp-htmlmin');

let paths = [
    'views/add-image/upload-image.html',
    'views/error/error.html',
    'views/home/detailed-image.html',
    'views/home/home.html',
    'views/home/status.html'
];

gulp.task('minify-html', () => {
    gulp.src(paths)
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('minified/'));
});