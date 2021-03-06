/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var command = require("../../../lib/commands/info");

var should = require("should");
var sinon = require("sinon");
var when = require("when");

var request = require("../../../lib/request");
var result = require("./result_helper");

describe("commands/info", function() {
    afterEach(function() {
        if (request.request.restore) {
            request.request.restore();
        }
        result.reset();
    });
    
    it('displays information on a module', function(done) {
        var error;
        sinon.stub(request,"request",function(path,opts) {
            try {
                should(path).be.eql("/nodes/testnode");
                opts.should.eql({});
            } catch(err) {
                error = err;
            }
            return when.resolve([]);
        });
        command({_:[null,"testnode"]},result).then(function() {
            if (error) {
                throw error;
            }
            result.logDetails.called.should.be.true;
            done();
        }).otherwise(done);
    });
    
    it('reports error', function(done) {
        var error;
        sinon.stub(request,"request",function(path,opts) {
            try {
                should(path).be.eql("/nodes/testnode");
                opts.should.eql({});
            } catch(err) {
                error = err;
            }
            return when.reject("error");
        });
        command({_:[null,"testnode"]},result).then(function() {
            if (error) {
                throw error;
            }
            result.logDetails.called.should.be.false;
            result.warn.called.should.be.true;
            result.warn.args[0][0].should.eql("error");
            done();
        }).otherwise(done);
    });
    
    it('displays command help if node not specified', function(done) {
        command({_:{}},result);
        result.help.called.should.be.true;
        done();
    });
        
});