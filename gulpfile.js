var pkg = require('./package.json'),
  gulp = require('gulp'),
  glob = require('glob'),
  minifyCSS = require('gulp-clean-css'),
  plugins = require('gulp-load-plugins')();


var config = {
  sass: './sass/**/*.{scss,sass}',
  sassSrc: './sass/rwd.scss',
  sassIe: './sass/ie.scss',
  sassPrint: './sass/print.scss',
  css: './css',
  js:'./scripts',
  jsSrc:'./js/cuba.js'
};

// Transpile, concatenate and minify scripts
function scripts() {
  return gulp.src(config.jsSrc)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(config.js));
}

// Compile styles.
function styles() {
  return gulp.src(config.sassSrc)
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'collapsed'
    }))
    .pipe(minifyCSS())
    .pipe(plugins.concat('cuba.css'))
    .pipe(gulp.dest(config.css))
    .pipe(plugins.size({title:'css'}));
}

// Compile print styles.
function stylesPrint() {
  return gulp.src(config.sassPrint)
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'collapsed'
    }))
    .pipe(minifyCSS())
    .pipe(plugins.concat('print.css'))
    .pipe(gulp.dest(config.css))
    .pipe(plugins.size({title: 'css'}));
}

// Watch files.
function watchFiles() {
  gulp.watch(config.sass, styles);
  gulp.watch(config.sassPrint, stylesPrint);
  gulp.watch(config.jsSrc, scripts);
}

const build = gulp.series(styles, stylesPrint, scripts, watchFiles);
const watch = gulp.series(watchFiles);

exports.watch = watch;
exports.default = build;
