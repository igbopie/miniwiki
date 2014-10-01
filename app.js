
var cluster = require('cluster');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('miniwiki');

var readers = require('./routes/readers');
var writers = require('./routes/writers');
var WebSocket = require('ws');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = 1;//require('os').cpus().length;


    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }


// Code to run if we're in a worker process
} else {

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

    app.use('/readers', readers);
    app.use('/writers', writers);

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
    var WebSocketServer = WebSocket.Server;
    var wss = new WebSocketServer({port: 8080});
    wss.on('connection', function(ws) {
        console.log("WS running");
        writers.addWS(ws);

    });

    //TODO make this more usable
    setTimeout(function() {
        readers.setupWs(new WebSocket('ws://localhost:8080'))
    },1000);



}


