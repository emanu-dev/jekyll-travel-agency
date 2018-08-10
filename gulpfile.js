const gulp = require('gulp');
const eventStream = require('event-stream');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cp = require('child_process');
const image = require('gulp-image');
const notify = require('gulp-notify');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

let jekyll   = 'jekyll';
let messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

let scripts = [
    './node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js',
    './node_modules/vanilla-masker/build/vanilla-masker.min.js',
    './node_modules/vanilla-lazyload/dist/lazyload.iife.js'
];

gulp.task('clean:js', () => {
    return gulp.src('./public/scripts/app.min.js').pipe(clean());
});

gulp.task('js', () => {
    return eventStream.merge([
    gulp.src('_javascript/**/*.js')
        .pipe(babel({
            presets: ['env']
        })),
        gulp.src(scripts)
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/javascript/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('javascript/'));
});

gulp.task('clean:libjs', () => {
    return gulp.src('./public/scripts/lib.min.js').pipe(clean());
});

gulp.task('libjs', () => {
    return eventStream.merge([
        gulp.src(scripts)
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('lib.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/javascript/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('javascript/'));
});


gulp.task('images', () => {
    return gulp.src('images/**')
        .pipe(image({
            pngquant: true,
            optipng: true,
            zopflipng: true,
            jpegRecompress: true,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: false
        }))
        .pipe(gulp.dest('images/'));
});

gulp.task('jekyll-build', ['images'], (done) => {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build', 'images'], () => {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass'], () => {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', () => {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
        }))
        .on('error',
            notify.onError({
                    title: 'Sass error',
                    message: '<%= error.message %>'
            })
        )        
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});


gulp.task('watch', () => {
    gulp.watch(['_scss/*.scss', '_scss/**/*.scss'], ['sass']);
    gulp.watch(['_javascript/*.js'], ['js']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['images', 'browser-sync', 'watch']);