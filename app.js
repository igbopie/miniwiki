
/*

 You are building an API for a mini-Wikipedia with only a single article called 'Latest_plane_crash'.
 Just after a plane crash happened, there is a surge of API requests for this article from app and desktop users (>20k req/s).
 As an approximation for some data massaging, each request for the article in your server needs to recursively calculate fibonacci(34).

 At the same time, a lot of editors following the news are scrambling to update the page as details emerge (up to 10 attempted edits/s).
 Editing happens by downloading the current revision of the text, modifying it and posting it back to the API.
 The article contains HTML, and should be persisted stored as a plain file on disk. Your code will run on a single 12-core server.

 Please design and implement a simple server providing this API using an environment of your choice.
 Please describe which other resources you'd use in production to handle the request rates mentioned,
 and how you'd interact with those resources.


 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
