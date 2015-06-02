var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var jshint = require( 'gulp-jshint' );
var jscs = require( 'gulp-jscs' );
var lintspaces = require( 'gulp-lintspaces' );
var exec = require( 'child_process' ).exec;
var source = require( 'vinyl-source-stream' ); // Used to stream bundle for further handling
var watchify = require( 'watchify' );
var reactify = require( 'reactify' );
var concat = require( 'gulp-concat' );

gulp.task('bower-install', function( cb ) {
    exec( 'bower install', function ( err, stdout, stderr ) {
        cb( err );
    });
});

gulp.task('npm-install', function( cb ) {
    exec( 'npm install', function ( err, stdout, stderr ) {
        cb( err );
    });
});

gulp.task('lint', [ 'npm-install' ], function() {
    return gulp.src( [ 'src/**/*.js' ] )
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) );
});

gulp.task('codestyle', [ 'npm-install' ], function() {
    return gulp.src( [ 'src/**/*.js' ] )
        .pipe(jscs())
        .pipe(lintspaces({
            editorconfig: '.editorconfig',
            ignores: [
                'js-comments'
            ]
        }));
});

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: [ './scripts/app.js' ], // Only need initial file, browserify finds the deps
        transform: [ reactify ], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify( bundler );

    return watcher
        .on('update', function () { // When any files update
            var updateStart = Date.now();
            console.log( 'Updating!' );
            watcher.bundle() // Create new bundle that uses the cache for high performance
            .pipe( source( './scripts/app.js' ) )
            // This is where you add uglifying etc.
            .pipe( gulp.dest( './app/' ) );
            console.log( 'Updated!', (Date.now() - updateStart) + 'ms' );
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe( source( './scripts/app.js' ) )
        .pipe( gulp.dest( './app/' ) );
});

gulp.task('copy-index', function() {
    return gulp.src( 'index.html' )
        .pipe( gulp.dest( './app/' ) );
});

var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('app')
    .pipe(webserver({
        open: true,
        port: 80,
        proxies: [{
            source: "/lego",
            target: "http://localhost:9999/lego"
        }]
    }));
});

gulp.task('default', [ 'browserify', 'copy-index' ]);
