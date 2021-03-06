var express = require('express');
var fs = require('fs');
var DATA_FILE = __dirname+"/../data/article.txt";
var DATA_FILE_LENGTH = 5000;
var RandomUtil = require("../utils/random");

var router = express.Router();


// SOCKETS to keep readers updated
var myws = [];

router.addWS = function(ws){
    console.log("Addded client")
    myws.push(ws);
}

/* GET users listing. */
router.get('/', function(req, res) {
    //read file and return it
    fs.readFile(DATA_FILE, "utf8", function (err, data) {
        if (err){
            handleError(res,err);
        }else {
            //Possibly we need to handle more things and return more data
            res.json({content: data});
        }
    });
});

router.post('/', function(req, res) {
    //write
    var content = req.body.content;
    fs.writeFile(DATA_FILE,content, function(err) {
        if(err) {
            handleError(res,err);
        } else {
            res.json({}); //http 200
            //BG
            for(var i = 0 ; i < myws.length; i++) {
                console.log("sending msg "+i);
                myws[i].send(content);
            }
        }
    });
});


function initDemoFile(){
    var text = RandomUtil.randomText(DATA_FILE_LENGTH);
    fs.writeFile(DATA_FILE, text, function(err) {
        if(err) {
            console.error(err);
        } else {
            console.log("Initial file was generated");
        }
    });
}

function handleError(res,err){
    console.error(err);
    res.json(500,{msg:"there was an error",error:err});
}
initDemoFile();


module.exports = router;
