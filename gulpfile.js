/*
*  Gulp config file
*  @project plugin_title
*  Author: Your Name
*/

/**
* Gulp build config file.
*
* @link        http://example.com
* @since       1.0.0
*
* @package     plugin-name
* @Author      Your Name
*
*/

// npm i --D gulp del gulp-concat gulp-sass gulp-csso gulp-autoprefixer gulp-sourcemaps gulp-uglify gulp-babel @babel/core@^7.0.0 gulp-zip
const { src, dest, series, parallel, watch } = require('gulp');
const del           = require('del');//
const concat        = require('gulp-concat');//
const sass          = require('gulp-sass');//
const csso          = require('gulp-csso');//
const autoprefixer  = require('gulp-autoprefixer');//
const sourcemaps    = require('gulp-sourcemaps');//
const uglify        = require('gulp-uglify');//
const babel         = require('gulp-babel');//
const zip           = require('gulp-zip'); //

sass.compiler = require( 'node-sass' );


const liveFiles = [
  './**/*',
  '!../plugin-name' // Keep the folder itself.

  // EXAMPLE FOR IN-PLUGIN REACT APP EXCLUSION:
  // '!./public/plugin-react-app/node_modules/**/*',
  // '!./public/plugin-react-app/public/**/*',
  // '!./public/plugin-react-app/src/**/*',
  // '!./public/plugin-react-app/*.*',

];

// Target the folder to delete/replace:
const localCopyPath =   'C:/Users/benho/Repos/plugin-name_PROJECT/plugin-name';
const localDelPath = [
  'C:/Users/benho/Repos/plugin-name_PROJECT/plugin-name/**/*',

  '!C:/Users/benho/Repos/plugin-name_PROJECT/plugin-name/.git',
  '!C:/Users/benho/Repos/plugin-name_PROJECT/plugin-name/.gitattributes',
  '!C:/Users/benho/Repos/plugin-name_PROJECT/plugin-name/.gitignore',
  '!C:/Users/benho/Repos/plugin-name_PROJECT/plugin-name/README.md',
]


// const zipFiles = 'C:/Users/benho/WordPress/dev/wp-content/plugins/**/*'
// const zipDest  = 'C:/Users/benho/WordPress/dev/wp-content/plugins'

// Set the files to watch: >>>> FIX: LOOPING!
const watchFiles = [
  './**/*',
  '!./assets/**/*', // Don't watch the minified files.

  // EXAMPLE FOR IN-PLUGIN REACT APP EXCLUSION:
  // '!./public/plugin-react-app/node_modules/**/*',
];


// ***** Public File Handlers ***** //
function publicCSS() {
  return src( './public/**/*.scss' )     // Get everything Sassy.
  .pipe( sass().on( 'error', sass.logError ) )        // Transpile to CSS.
  .pipe( autoprefixer( {                              // Prefix for browser compatibility.
    browsers: [ 'last 2 versions' ]
  } ) )
  .pipe( sourcemaps.init() )                         // Start sourcemap processing.
  .pipe( concat( 'public.min.css' ) )                 // Combine all files into one.
  .pipe( csso() )                                   // Minify the CSS.
  .pipe( sourcemaps.write() )                        // Output sourcemap.
  .pipe( dest( './assets/public' ) )
}


function publicJS() {
  return src([
    './public/**/*.js',
    // '!./public/plugin-react-app/**/*',
  ])
  .pipe( sourcemaps.init() )
  .pipe( concat( 'public.min.js' ) )
  .pipe( babel( /*{ presets: ['@babel/preset-env'] }*/ ) )
  .pipe( uglify() )
  .pipe( sourcemaps.write() )
  .pipe( dest( './assets/public' ) )
}


// ***** Admin File Handlers ***** //
function adminCSS() {
  return src( './admin/**/*.scss' )     // Get everything Sassy.
  .pipe( sass().on( 'error', sass.logError ) )        // Transpile to CSS.
  .pipe( autoprefixer( {                              // Prefix for browser compatibility.
    browsers: [ 'last 2 versions' ]
  } ) )
  .pipe( sourcemaps.init() )                         // Start sourcemap processing.
  .pipe( concat( 'admin.min.css' ) )                 // Combine all files into one.
  .pipe( csso() )                                   // Minify the CSS.
  .pipe( sourcemaps.write() )                        // Output sourcemap.
  .pipe( dest( './assets/admin' ) )
}

function adminJS() {
  return src([
    './admin/**/*.js',
    // '!./admin/plugin-react-app/**/*',
  ])
  .pipe( sourcemaps.init() )
  .pipe( concat( 'admin.min.js' ) )
  .pipe( babel( /*{ presets: ['@babel/preset-env'] }*/ ) )
  .pipe( uglify() )
  .pipe( sourcemaps.write() )
  .pipe( dest( './assets/admin' ) )
}



function clean() {
  return del(localDelPath, {force: true} );
};


// Copy files.
function copy() {
  return src( liveFiles )
  .pipe( dest( localCopyPath ) )
}

// Zip plugin:
// function zipPlugin() {
//   return src( zipFiles )
//   .pipe( zip( 'plugin-name.zip' ) )
//   .pipe( dest( zipDest ) )
// }


// Set the npm scripts:
exports.clean = clean
// exports.css = css
// exports.js = js
exports.copy = copy
exports.zip = zipPlugin


exports.default = series(
  clean,
  parallel(
    publicCSS,
    // adminCSS,
  ),
  parallel(
    publicJS,
    // adminJS,
  ),
  copy,
  // zipPlugin,
);

// Set up the watcher series: >>>> FIX: LOOPING!
const doAll = series(
  clean,
  parallel(
    publicCSS,
    // adminCSS
  ),
  parallel(
    publicJS,
    // adminJS,
  ),  copy,
  // zipPlugin,
);

// watch( watchFiles, doAll );
