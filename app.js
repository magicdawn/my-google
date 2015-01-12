/**
 * global variable
 */
global.Promise = require('bluebird');
global.co = require('co');
global.request = require('superagent');
require('superagent-bluebird-promise');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * module dependency
 */
var express = require('express');
var app = express();
var url = require('url');
var path = require('path');
var favicon = require('serve-favicon');
var less = require('./lib/less-dev-middleware');
var morgan = require('morgan');


/**
 * middlewares
 */
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('common'));
if (app.get('env') === 'development') { // only use less middleware when dev
    app.use('/public/css', less(__dirname + "/public/css-src"));
}
app.use(['/public', '/'], express.static(path.join(__dirname, "public")));

/**
 * settings
 */
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'jade');

/**
 * Router
 */
app.use(require('./routes/index'));

/**
 * listen
 */
app.listen(process.env.PORT || 4000, function() {
    console.log("my-google server listened at http://localhost:%d", this.address().port);
});