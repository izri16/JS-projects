/**
* gulp.task(name, deps, cb)
*   name - string
*   deps - array of tasks names (optional)
*   cb - function that performs tasks
*
* gulp.src - files we want to use (use .pipe to chain output)
* gulp.dest - files we want to write
* gulp.watch - watch for changes
*
*/

const gulp  = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.config.js');
const webpackProductionConfig = require('./webpack.production.config.js');
const clean = require('gulp-clean');
const exec = require('child_process').exec;
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['dev']);

gulp.task('dev', () => {
  const myConfig = Object.create(webpackDevConfig);

  new WebpackDevServer(webpack(myConfig), {
    hot: true,
    stats: {
      colors: true
    }
  }).listen(3000, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:3000');
  });
});

gulp.task('set-prod-node-env', () => {
  return process.env.NODE_ENV = 'production';
});

gulp.task('build:clean', () => {
  return gulp.src('public/dist/*', {read: false})
    .pipe(clean());
});

gulp.task('build', ['build:clean', 'set-prod-node-env'], (cb) => {
  const myConfig = Object.create(webpackProductionConfig);

  // not sure if return is ok here
  return webpack(myConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
      progress: true
    }));
    cb();
  });
});

gulp.task('prestart:clean', () => {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
});

gulp.task('prestart', ['prestart:clean'], () => {
  return gulp.src('server.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    // can be handy to rename file
    .pipe(concat('server.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('start', ['build', 'prestart'], (cb) => {
  return exec('node dist/server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js','!node_modules/**', 'server/**', 'public/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    .pipe(eslint.result(result => {
      // Called for each ESLint result.
      console.log(`ESLint result: ${result.filePath}`);
      console.log(`# Messages: ${result.messages.length}`);
      console.log(`# Warnings: ${result.warningCount}`);
      console.log(`# Errors: ${result.errorCount}`);
    }))
    .pipe(eslint.results(results => {
      // Called once for all ESLint results.
      console.log(`Total Results: ${results.length}`);
      console.log(`Total Warnings: ${results.warningCount}`);
      console.log(`Total Errors: ${results.errorCount}`);
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('unnecessary', () => {
  gulp.src('source/*.html').pipe(gulp.dest('putithere'));
});

// when any of these files change run the tasks
gulp.watch('source/js/**/*.js', ['jshint']);

// second option
gulp.watch('source/js/**/*.js', () => {

});
