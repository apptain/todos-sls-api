"use strict";

const Promise = require("bluebird");
const AWS = require("aws-sdk");

const dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };

var client = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

module.exports = (method, params) => {
  return Promise.fromCallback(cb => client[method](params, cb));
};
