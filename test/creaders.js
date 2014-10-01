/**
 * Created by igbopie on 9/30/14.
 */
var should = require('should');
var Random = require("../utils/random");
var easyhttprequest = require("../utils/easyhttprequest");

describe('Readers', function(){


    describe('#read', function(){
        it('should write and read the latest version', function(done){
            var text = Random.randomText(2000);
            easyhttprequest.post("/writers",{content:text},function(err,data){
                if(err) return done(err);
                easyhttprequest.get("/readers",function(err,data){
                    if(err) return done(err);
                    //console.log(data);
                    data.should.have.property("content");

                    data.content.should.be.equal(text);

                    done();
                })
            })

        })
    })
});
