var express = require('express');
var WebSocket = require('ws');
var fibonacci = require("../utils/fibonacci");
var router = express.Router();


// CACHED MEMORY VERSION
var content = "";


/* GET home page. */
router.get('/', function(req, res) {
    //EMULATE SOME PROCESS
    fibonacci.fibonacci(34,function(err,fibNumber) {
        res.json({content: content});
    });
});

router.setupWs = function(ws){

    //Websocket sync
    ws.on('open', function() {
        console.log('connected');
    });
    ws.on('message', function(data, flags) {
        // flags.binary will be set if a binary data is received
        // flags.masked will be set if the data was masked

        console.log("readers "+ data);
        content = data;
    });
}

module.exports = router;