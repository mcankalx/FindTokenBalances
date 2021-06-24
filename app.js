// Load node module and initialising the object
var createError = require( 'http-errors' );
var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan' );
var http = require( 'http' );
var path = require( "path" );
var bodyParser = require( 'body-parser' );
var balancefinderRouter = require( './routes/balancefinder' );
var app = express();

app.use( bodyParser.urlencoded(
{
  extended: false
} ) );


// environment variables. Setting the environment as development, which will be used to fetch the development config values.
process.env.NODE_ENV = 'development';

// Load request module
var lodash = require( 'lodash' );

// loading config values
var config = require( './config/config.json' );
var defaultConfig = config.development;
var environment = process.env.NODE_ENV || 'development';
var environmentConfig = config[ environment ];
var finalConfig = lodash.merge( defaultConfig, environmentConfig );

// as a best practice all global variables should be referenced via global syntax and their names should always begin with g

global.gConfig = finalConfig;

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded(
{
  extended: false
} ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( global.gConfig.app_uri_gettokenbalance, balancefinderRouter );



// catch 404 and forward to error handler
app.use( function ( req, res, next )
{
  next( createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res, next )
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err :
  {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
} );



module.exports = app;