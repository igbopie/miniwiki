/**
 * Created by igbopie on 9/30/14.
 */
var assert = require("assert");
var fibonacci = require("../utils/fibonacci");

// Source : http://en.wikipedia.org/wiki/Fibonacci_number
// F0   F1	F2	F3	F4	F5	F6	F7	F8	F9	F10	F11	F12	F13	F14	F15	F16	F17	    F18	    F19	    F20
// 0	1	1	2	3	5	8	13	21	34	55	89	144	233	377	610	987	1597	2584	4181	6765
// Since I have a limited time I am going to test numbers: 0,1,2,10,20.
describe('Fibonacci', function(){
    describe('#fibonacci(0)', function(){
        it('should verify that is calculating correctly', function(done){
            fibonacci.fibonacci(0,function(err,fibNumber){
                if(err) return done(err);
                assert.equal(0, fibNumber);
                done();
            })
        })
    })

    describe('#fibonacci(1)', function(){
        it('should verify that is calculating correctly', function(done){
            fibonacci.fibonacci(1,function(err,fibNumber){
                if(err) return done(err);
                assert.equal(1, fibNumber);
                done();
            })
        })
    })

    describe('#fibonacci(2)', function(){
        it('should verify that is calculating correctly', function(done){
            fibonacci.fibonacci(2,function(err,fibNumber){
                if(err) return done(err);
                assert.equal(1, fibNumber);
                done();
            })
        })
    })

    describe('#fibonacci(10)', function(){
        it('should verify that is calculating correctly', function(done){
            fibonacci.fibonacci(10,function(err,fibNumber){
                if(err) return done(err);
                assert.equal(55, fibNumber);
                done();
            })
        })
    })

    describe('#fibonacci(20)', function(){
        it('should verify that is calculating correctly', function(done){
            fibonacci.fibonacci(20,function(err,fibNumber){
                if(err) return done(err);
                assert.equal(6765, fibNumber);
                done();
            })
        })
    })
});
