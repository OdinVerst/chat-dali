'use strict';

const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    del = require('del'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    spritesmith = require('gulp.spritesmith'),
    sourcemaps = require('gulp-sourcemaps'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('fonts:build', function () {
   return gulp.src('./src/fonts/**/*.*')
       .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('img:build', function () {
    return gulp.src('./src/img/oth/*.*')
        .pipe(gulp.dest('./build/img/oth/'));
});

gulp.task('json:build', function () {
    return gulp.src('./src/json/**/*.json')
        .pipe(gulp.dest('./build/json/'));
});


gulp.task('sprite:png', function() {
    var spriteData =
        gulp.src('./src/img/sprite/png/*.*')
            .pipe(spritesmith({
                imgName: 'sprite-rast.png',
                cssName: 'sprite-rast.css',
            }));

    spriteData.img.pipe(gulp.dest('./build/img/'));
    spriteData.css.pipe(gulp.dest('./build/css/'));
    return spriteData;
});


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(prefixer({
            browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1','Firefox >= 2'],
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream: true}));
});

gulp.task('concat_js:auth', function() {
    return gulp.src(['./src/js/auth/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('auth_all.js'))
        .pipe(minify({
            ext:{
                src:'',
                min:'.min.js'
            },
            noSource: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('concat_js:chat', function() {
    return gulp.src(['./src/js/chat/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('chat_all.js'))
        .pipe(minify({
            ext:{
                src:'',
                min:'.min.js'
            },
            noSource: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'));
});
gulp.task('js:build', function () {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('html:build', function () {
    return gulp.src('./src/html/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build'))
        .pipe(reload({stream: true}));
});

gulp.task('sprite:svg', function () {
   return gulp.src('./src/img/sprite/svg/*.svg')
       .pipe(svgmin({
           js2svg: {
               pretty: true
           }
       }))
       .pipe(cheerio({
           run: function ($) {
               $('[fill]').removeAttr('fill');
               $('[stroke]').removeAttr('stroke');
               $('[style]').removeAttr('style');
           },
           parserOptions: {xmlMode: true}
       }))
       .pipe(replace('&gt;', '>'))
       .pipe(svgSprite({
           mode: {
               symbol: {
                   sprite: "../sprite-vector.svg",
               }
           }
       }))
       .pipe(gulp.dest('./build/img'));
});


gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/chat/*.js', gulp.series('concat_js:chat'));
    gulp.watch('./src/js/auth/*.js', gulp.series('concat_js:auth'));
    gulp.watch('./src/img/sprite/png/*.*', gulp.series('sprite:png'));
    gulp.watch('./src/**/*.html', gulp.series('html:build'));
    gulp.watch('./src/img/sprite/svg/*.*', gulp.series('sprite:svg'));
    gulp.watch('./src/fonts/**/*.*', gulp.series('fonts:build'));
    gulp.watch('./src/json/**/*.json', gulp.series('json:build'));
    gulp.watch('./src/img/oth/*.json', gulp.series('img:build'));
    gulp.watch('./src/js/*.js', gulp.series('js:build'));
});



gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'sass',
        'html:build',
        'concat_js:auth',
        'concat_js:chat',
        'js:build',
        'sprite:png',
        'sprite:svg',
        'fonts:build',
        'json:build',
        'img:build'
    ),
    gulp.parallel(
        'watch',
        'browser-sync'
    )
));