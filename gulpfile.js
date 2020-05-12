const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();


function minhtml() {
    return gulp.src('./dev/*.html')
        .pipe(htmlmin({
            collapseWhitespace: false
        }))
        .pipe(gulp.dest('app'));
}

function optimizar() {
    return gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/assets/images'))
}

//compIlaR scss dentro de css
function style() {
    // 1. donde esta mi archivo scss
    return gulp.src('./dev/scss/**/*.scss')
        // 2. pasar el archivo al compilador
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        // 3. donde quiero guardar mi archivo css
        .pipe(gulp.dest('./app/assets/css'))
        // 4. mostrar los cambios automaticamente en el navegador
        .pipe(browserSync.stream())
}

function compressjs() {
    return pipeline(
        gulp.src('./dev/js/**/*.js'),
        uglify(),
        gulp.dest('./app/assets/js')
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dev'
        }
    })
    gulp.watch('./dev/scss/**/*.scss', style)
    gulp.watch('./dev/js/**/*.js', compressjs)
    gulp.watch('./dev/*.html').on('change', browserSync.reload)
    gulp.watch('./dev/*.html', minhtml)
}
exports.watch = watch;
exports.style = style;
exports.compressjs = compressjs;
exports.optimizar = optimizar;
exports.htmlmin = minhtml;