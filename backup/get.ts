// import dynamoDbLib from "../../libs/dynamodb-lib";
import { APIGatewayProxyHandler } from 'aws-lambda';
import dynamodbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { String } from 'aws-sdk/clients/batch';

// const add: APIGatewayProxyHandler = async (event, context) => {

export function main(event, context, callback){
  let statusCode = 200;
  let message = 'ok';
  try {
    const params = {
      TransactItems: [
        {
          GetItem: {
            TableName: process.env.TABLE_PREFIX + '-todos', 
            Key: {
              id: {
                S: event.pathParameters.id
              }
            },
            // ConditionExpression: 'restCount > :none',
            // UpdateExpression: 'SET restCount = restCount - :one',
            // ExpressionAttributeValues: {
            //   ':none': {
            //     N: '0'
            //   },
            //   ':one': {
            //     N: '1'
            //   }
            // }
          }
        },
        // {
        //   Put: {
        //     TableName: `${process.env.DYNAMO_PREFIX}-transaction-items`,
        //     Item: {
        //       id: {
        //         S: uuid.v4()
        //       }
        //     }
        //   }
        // }
      ]
    };
  
    // dynamodbLib.transactGetItems(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });
    return new Promise((resolve, reject) => {
      dynamodbLib.transactGetItems(params, function(err, data) {
        
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item),
          };
          return resolve(response as any)
        }
      });
    });
  } catch (err) {
    statusCode = 500;
    message = `error: ${err}`;
  }
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
      input: event,
    }),
  };
}

function getItem(id: String): Promise<void> {
  const params = {
    TransactItems: [
      {
        Get: {
          TableName: process.env.TABLE_PREFIX + '-todos', 
          Key: {
            id: {
              S: id
            }
          },
          // ConditionExpression: 'restCount > :none',
          // UpdateExpression: 'SET restCount = restCount - :one',
          // ExpressionAttributeValues: {
          //   ':none': {
          //     N: '0'
          //   },
          //   ':one': {
          //     N: '1'
          //   }
          // }
        }
      },
      // {
      //   Put: {
      //     TableName: `${process.env.DYNAMO_PREFIX}-transaction-items`,
      //     Item: {
      //       id: {
      //         S: uuid.v4()
      //       }
      //     }
      //   }
      // }
    ]
  };

  // dynamodbLib.transactGetItems(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });
  return new Promise((resolve, reject) => {
    dynamodbLib.transactGetItem(params, function(err, data) {
      
      if (err) {
        console.log(err, err.stack);
        return reject(err);
      } else {
        const response = {
          statusCode: 200,
          body: JSON.stringify(data.Item),
        };
        return resolve(response as any)
      }
    });
  });
}

// export default add;

// const response = {
//   statusCode: 200,
//   body: JSON.stringify(result.Item),
// };
// callback(null, response);
// }).catch((error) => {
// console.error(error);
// callback(new Error('Couldn\'t fetch the todo item.'));
// return;
// });
// export async function main(event, context, callback) {
//   const dynamodb  = dynamodbLib.DocumentClient();
//   const params = {
//     TableName: process.env.TABLE_PREFIX + '-todos', 
//     // 'Key' defines the partition key and sort key of the item to be retrieved
//     // - 'creatorId': Identity Pool identity id of the authenticated user
//     // - 'eventId': path parameter
//     Key: {
//       id: event.pathParameters.id
//     }
//   };

//   // fetch all todos from the database
//   // dynamodb.scan(params).promise().then((result) => {
//   //   // create a response
//   //   const response = {
//   //     statusCode: 200,
//   //     body: JSON.stringify(result.Items),
//   //   };
//   //   callback(null, response);
//   // }).catch((error) => {
//   //   console.error(error);
//   //   callback(new Error('Couldn\'t fetch the todos'));
//   //   return;
//   // });

//   dynamodb.get(params).promise().then((result) => {
//     // create a response
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(result.Item),
//     };
//     callback(null, response);
//   }).catch((error) => {
//     console.error(error);
//     callback(new Error('Couldn\'t fetch the todo item.'));
//     return;
//   });
//   // //const dynamoDb  = dynamoDbLib();
//   // const result = await dynamoDbLib.scan(params);
//   // if (result.Item) {
//   //   // Return the retrieved item
//   //   return success(result.Item);
//   // } else {
//   //   return failure({ status: false, error: "Item not found." });
//   // }
// }
