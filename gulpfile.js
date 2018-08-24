const gulp = require('gulp');
const eventStream = require('event-stream');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cp = require('child_process');
const image = require('gulp-image');
const notify = require('gulp-notify');
const parcel = require ('gulp-parcel');
const prefix = require('gulp-autoprefixer');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

let jekyll   = 'jekyll';
let messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

let styles = [
    './node_modules/basiclightbox/dist/basicLightbox.min.css'
];

let scripts = [
    './node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js',
    './node_modules/vanilla-masker/build/vanilla-masker.min.js',
    './node_modules/vanilla-lazyload/dist/lazyload.min.js',
    './node_modules/basiclightbox/dist/basicLightbox.min.js',
    './node_modules/axios/dist/axios.min.js'
];

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


gulp.task('jekyll:build', (done) => {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task( 'parcel:build', () => {
    gulp.src('./_javascript/app.js', {read:false})
        .pipe(parcel({outDir: './_site/javascript/'}));
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

gulp.task('sass', () => {
    return eventStream.merge([
        gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })),        
        gulp.src(styles)
    ])
        .on('error',
            notify.onError({
                    title: 'Sass error',
                    message: '<%= error.message %>'
            })
        )        
        .pipe(concat('main.css'))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('browser:reload', () => {
    browserSync.reload();
});

gulp.task('site:rebuild', (callback) => {
    gulpSequence('jekyll:build', 'parcel:build', 'browser:reload')(callback);   
});

gulp.task('site:build', (callback) => {
    gulpSequence('jekyll:build', 'parcel:build', 'images', 'sass')(callback);   
});

gulp.task('browser:sync', ['sass'], () => {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('watch', () => {
    gulp.watch(['_scss/*.scss', '_scss/**/*.scss'], ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', '_javascript/**/*.js'], ['site:rebuild']);
});

gulp.task('default', (callback) => {
    gulpSequence('jekyll:build', 'parcel:build', 'images', 'browser:sync', 'watch')(callback);
});