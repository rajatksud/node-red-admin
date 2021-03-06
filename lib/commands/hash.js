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

var when = require("when");
var prompt = require("../prompt");
try { bcrypt = require('bcrypt'); }
catch(e) { bcrypt = require('bcryptjs'); }

function command(argv,result) {
    return when.promise(function(resolve) {
        prompt.read({prompt:"Password:".bold,silent: true},function(err, password) {
            if (password) {
                result.log(bcrypt.hashSync(password, 8));
            }
            resolve();
        });
    });
}
command.name = "hash-pwd";
command.usage = command.name;
command.description = "Creates a password hash suitable for use with adminAuth or httpNodeAuth";

module.exports = command;
