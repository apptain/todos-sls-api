// import uuid from "uuid";
// import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import AWS from 'aws-sdk';

export async function main(event, context) {
  try {
  //TODO move to SQS
  // const data = JSON.parse(event.body);
  //const { invite} = data;
  // const {phoneNumber, message } = invite;

    // Create publish parameters
    var params = {
      Message: 'Yo! From the Spot Woke!', /* required */
      PhoneNumber: '17275194698'
    };

  // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  // Handle promise's fulfilled/rejehzxZM<>CN  JK>cted states
  publishTextPromise.then(
    function(data) {
      console.log("MessageID is " + data.MessageId);
    }).catch(
    function(err) {
      console.error(err, err.stack);
    });

  // const params = {
  //   TableName: "invites",
  //   Item: {
  //     inviteId: uuid.v1(),
  //     eventId: data.eventId,
  //     name: data.name,
  //     phoneNumber: data.phoneNumber,
  //     email: data.email,
  //     secretQuestion: data.secretQuestion,
  //     secretAnswer: data.secretAnswer,
  //     willBring: data.willBring,
  //     createdAt: Date.now()
  //   }
  // };

    // await dynamoDbLib.call("put", params);
    return success("sent");
  } catch (e) {
    return failure({ status: false });
  }
}
