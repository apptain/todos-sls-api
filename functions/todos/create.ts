import AWS from 'aws-sdk';
import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(spot, context) {
  const data = JSON.parse(spot.body);
  const params = {
    TableName: "spots",
    Item: {
      ownerId: spot.requestContext.identity.cognitoIdentityId,
      spotId: uuid.v1(),
      name: data.name,
      location: data.location,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      description: data.description,
      requests: data.requests,
      startTime: data.startTime,
      endTime: data.endTime,
      invitations: data.invitations,
      hosts: data.hosts,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);

    var accountId = context.invokedFunctionArn.split(":")[4];
    var queueUrl = 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/spots';

    // response and status of HTTP endpoint
    var responseBody = {
        message: ''
    };

    // SQS message parameters
    var queueParams = {
        MessageBody: spot.body,
        QueueUrl: queueUrl
    };

    var sqs = new AWS.SQS({
        region: 'us-east-1'
    });

    return sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log('error:', "failed to send message" + err);
            var responseCode = 500;
        } else {
            console.log('data:', data.MessageId);
            responseBody.message = 'Sent to ' + queueUrl;
            responseBody.messageId = data.MessageId;
        }
        var response = {
            statusCode: responseCode,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        };
        if(response){
          return success(queueParams.Item);
        }
        //callback(null, response);
    });
  } catch (e) {
    return failure({ status: false });
  }
}