"use strict";

const AWS = require("aws-sdk");

const dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };

var client = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

export default client;



  // export default (method, params) => {
  //   console.log('hello world');
  //   return (Promise as any).fromCallback(cb => client[method](params, cb));
  // };
  