'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var dynamodb_lib_1 = require("../../libs/dynamodb-lib");
function main(event, context, callback) {
    console.log(process.env.TABLE_PREFIX);
    console.log(JSON.stringify(dynamodb_lib_1.default));
    var params = {
        TableName: process.env.TABLE_PREFIX + '-todos',
    };
    // fetch all todos from the database
    dynamodb_lib_1.default.scan(params).promise().then(function (result) {
        // create a response
        var response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    }).catch(function (error) {
        console.error(error);
        callback(new Error('Couldn\'t fetch the todos'));
        return;
    });
}
exports.main = main;
;
//# sourceMappingURL=list.js.map