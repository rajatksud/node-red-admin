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

var request = require("../request").request;
 
function command(argv,result) {
    var node = argv._[1];
    if (!node) {
        return result.help(command);
    }
    request('/nodes/' + node, {}).then(result.logDetails).otherwise(result.warn);
}
command.name = "info";
command.usage = command.name+" {module|node} [options]";
command.description = "Displays more information about the module or node";

/*"If viewing a module, lists all of the nodes in that module with the format:\n" + format +
            "\n\n   If viewing an individual node-set, shows the node details." +
            "\n\n   A node id joins its module and node-set with a forward slash, eg. node-red/debug";
        var opts = "-v  --version   display the module version";
*/

module.exports = command;