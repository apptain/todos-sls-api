todos-sls-api
============================

## Credits
This repo is a refactor and enhancement of the aws serverless and dynamo examples from
[serverless-react-boilerplate](https://github.com/mjzone/serverless-boilerplate.git)

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/npm/l/serverless-dynamodb-local.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at Gitter](https://badges.gitter.im/todos-sls-api/community.svg)](https://gitter.im/todos-sls-api/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Requirements
* Java Runtime Engine (JRE) version 6.x or newer to run dynamodb locally.

## Features
* Support serverless v1.26.0
* Support offline development with dynamodb, lambda and API Gateway
* Support local dynamodb seeds/migrations
* Build automation in client and server to ease local development
* Deploy to multiple API Services 
* Use of Environment variables 
* Lambda CRUD operations for a Todo application with live reload
* React web application to utilize the API


## How to develop and test offline?
We have used [serverless-offline plugin](https://github.com/dherault/serverless-offline) and [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local) in this boilerplate. You can declare your table templates and seeds in `api/todo/offline/migrations/` folder just like the `todo.json` template. When you spin up the offline server, these tables will be used as the datasources for your lambda functions.

## Production vs Offline
Thanks to the offline plugin's environment variable `IS_OFFLINE` we can select between local dynamodb and aws dynamodb. 
```
var dynamodbOfflineOptions = {
        region: "localhost",
        endpoint: "http://localhost:8000"
    },
    isOffline = () => process.env.IS_OFFLINE;

var client = isOffline() ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions) :  new AWS.DynamoDB.DocumentClient();
```


