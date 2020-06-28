'use strict';

import dynamodb from "../../libs/dynamodb-lib";

export function main(event, context, callback){
  console.log(process.env.TABLE_PREFIX);
  console.log(JSON.stringify(dynamodb));

  const params = {
    TableName: process.env.TABLE_PREFIX + '-todos',
  };

  // fetch all todos from the database
  dynamodb.scan(params).promise().then((result) => {
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  }).catch((error) => {
    console.error(error);
    callback(new Error('Couldn\'t fetch the todos'));
    return;
  });

};
