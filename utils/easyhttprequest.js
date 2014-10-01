// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var FormData = require('form-data');
var fs = require('fs');

var PORT = 3000;
var HOST = 'localhost';

exports.get = function(path,callback) {
    // An object of options to indicate where to post to
    var getOptions = {
        host: HOST,
        port: PORT,
        path: path,
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var getRequest = http.request(getOptions, function(res) {
        var data ="";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if(res.statusCode == 200){
                callback(null,JSON.parse(data));
            }else {
                callback(res.statusCode);
            }
        });

    });

    getRequest.on('error', function(error) {
        callback(500);
    });
    getRequest.end();
    
}

exports.post = function(path,params,callback) {
    // Build the post string from an object
    var postData = querystring.stringify(params);

    // An object of options to indicate where to post to
    var postOptions = {
        host: HOST,
        port: PORT,
        path: path,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    // Set up the request
    var postRequest = http.request(postOptions, function(res) {
        var data ="";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if(res.statusCode == 200){
                callback(null,JSON.parse(data));
            }else {
                callback(res.statusCode);
            }
        });

    });

    // post the data
    postRequest.write(postData);
    postRequest.on('error', function(error) {
        callback(500);
    });
    postRequest.end();

}

