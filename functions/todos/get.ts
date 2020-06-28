import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "todos",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'creatorId': Identity Pool identity id of the authenticated user
    // - 'eventId': path parameter
    // Key: {
    //   eventId: event.pathParameters.id
    // }
  };

  try {
    //const dynamoDb  = dynamoDbLib();
    const result = await dynamoDbLib.scan(params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
