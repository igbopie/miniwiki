/**
 * Created by igbopie on 9/30/14.
 */
var should = require('should');
var Random = require("../utils/random");
var easyhttprequest = require("../utils/easyhttprequest");

describe('Writers', function(){
    describe('#read', function(){
        it('should read the latest version', function(done){
            easyhttprequest.get("/writers",function(err,data){
                if(err) return done(err);

                data.should.have.property("content");
                data.content.length.should.be.greaterThan(0);

                done();
            })
        })
    })

    describe('#write', function(){
        it('should write and read the latest version', function(done){
            var text = Random.randomText(2000);
            easyhttprequest.post("/writers",{content:text},function(err,data){
                if(err) return done(err);
                easyhttprequest.get("/writers",function(err,data){
                    if(err) return done(err);

                    data.should.have.property("content");
                    data.content.should.be.equal(text);

                    done();
                })
            })

        })
    })
});
