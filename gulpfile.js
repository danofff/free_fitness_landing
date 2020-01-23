const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const normalize = require('node-normalize-scss').includePaths;
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

const isDev = false;
const isCompressed = isDev? 'compressed' : 'uncompressed';

let scssFiles = [
    'app/scss/common.scss',
    'app/scss/header.scss',
    'app/scss/booking.scss',
    'app/scss/types.scss',
    'app/scss/trainers.scss',
    'app/scss/offers.scss',
    'app/scss/footer.scss'
];


function build(){
    return gulp.src(scssFiles)
                .pipe(concat('style.scss'))
                .pipe(gulpif(isDev, sourcemaps.init()))
                .pipe(sass(
                    { outputStyle: isCompressed,
                    includePaths: normalize})
                    .on('error', sass.logError))
                .pipe(autoprefixer({
                    cascade: false
                }))
                .pipe(gulpif(isDev, sourcemaps.write('.')))
                .pipe(gulp.dest('app/css/'));
}

gulp.task('watch', function() {
    gulp.watch(['app/scss/**/*.scss', 'app/*.html'], build)
});