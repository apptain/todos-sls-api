import dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export function main(event, context, callback) {
  const params = {
    TableName: process.env.TABLE_PREFIX + '-todos',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'creatorId': Identity Pool identity id of the authenticated user
    // - 'eventId': path parameter
    Key: {
      "id": event.pathParameters.id
    }
  };

  try {
    //const dynamoDb  = dynamoDbLib();
   dynamoDbLib.get(params, function(err, res) {
      if (err) {
        return failure(err);
      }
      if (!res.Item)  {
        callback(new Error('Item not found'));
        return;
      }
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(res.Item),
      };
      callback(null, response);
     });

    // if (result.Item) {
    //   // Return the retrieved item
    //   return success(result.Item);
    // } else {
    //   return failure({ status: false, error: "Item not found." });
    // }
  } catch (e) {
    return failure({ status: false });
  }

}
