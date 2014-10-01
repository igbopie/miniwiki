/**
 * Created by igbopie on 9/30/14.
 */

var SEED_F1 = 0;
var SEED_F2 = 1;


module.exports.fibonacci = function(number,callback){
    if(number == 0){
        callback(null,SEED_F1);
    } else if (number == 1){
        callback(null,SEED_F2);
    } else {
        recursiveFibonacci(SEED_F1, SEED_F2, 1, number, callback);
    }
}


function recursiveFibonacci(n1,n2,currentDepth,depthLimit,callback){
    var number = n1 + n2;
    if(currentDepth == depthLimit){
        callback(null,number);
    } else{
        recursiveFibonacci(number,n1,currentDepth+1,depthLimit,callback);
    }
}
