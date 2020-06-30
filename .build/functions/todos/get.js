"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var dynamodb_lib_1 = require("../../libs/dynamodb-lib");
var response_lib_1 = require("../../libs/response-lib");
function main(event, context, callback) {
    var params = {
        TableName: process.env.TABLE_PREFIX + '-todos',
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'creatorId': Identity Pool identity id of the authenticated user
        // - 'eventId': path parameter
        Key: {
            "id": {
                S: event.pathParameters.id
            }
        }
    };
    try {
        //const dynamoDb  = dynamoDbLib();
        dynamodb_lib_1.default.getItem(params, function (err, res) {
            if (err)
                callback(err);
            if (!res.Item)
                callback(new Error('No item found'));
            callback(null, JSON.stringify(res.Item));
            return;
        });
        // if (result.Item) {
        //   // Return the retrieved item
        //   return success(result.Item);
        // } else {
        //   return failure({ status: false, error: "Item not found." });
        // }
    }
    catch (e) {
        return response_lib_1.failure({ status: false });
    }
}
exports.main = main;
//# sourceMappingURL=get.js.map