
var AVAILABLE_CHARS ="abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789 \n";

module.exports.randomText = function(length) {

    var text = new Array(length);

    for (var i = 0; i < text.length; i++) {
        var randomNumber = Math.random()*AVAILABLE_CHARS.length % AVAILABLE_CHARS.length;
        text[i] = AVAILABLE_CHARS.charAt(randomNumber);
    }

    return text.join('');
}