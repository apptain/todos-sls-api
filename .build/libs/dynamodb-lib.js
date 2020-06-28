"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
};
var client = process.env.IS_OFFLINE
    ? new AWS.DynamoDB(dynamodbOfflineOptions)
    : new AWS.DynamoDB();
exports.default = client;
//# sourceMappingURL=dynamodb-lib.js.map