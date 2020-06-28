"use strict";
var Promise = require("bluebird");
var AWS = require("aws-sdk");
var dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
};
var client = process.env.IS_OFFLINE
    ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
    : new AWS.DynamoDB.DocumentClient();
module.exports = function (method, params) {
    return Promise.fromCallback(function (cb) { return client[method](params, cb); });
};
//# sourceMappingURL=dynamodb.js.map