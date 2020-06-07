"use strict";

const Promise = require("bluebird");
const AWS = require("aws-sdk");
const {createServer} = require('dynamodb-admin');

const dynamodb = new AWS.DynamoDB();
const dynClient = new AWS.DynamoDB.DocumentClient({service: dynamodb});

const dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  };

var client = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

if(process.env.IS_OFFLINE){
  const app = createServer(dynamodb, dynClient);

  const port = 8001;
  const server = app.listen(port);
  server.on('listening', () => {
    const address = server.address();
    console.log(`  listening on http://0.0.0.0:${address.port}`);
  });
}

module.exports = (method, params) => {
  return Promise.fromCallback(cb => client[method](params, cb));
};
