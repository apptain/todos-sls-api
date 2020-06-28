// import uuid from "uuid";
// import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { failure } from "../../libs/response-lib";
import sgMail from '@sendgrid/mail';

export async function main(invite, context) {
  try {

    sgMail.setApiKey("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");
    const msg = {
      to: 'jdemilo@gmail.com',
      from: 'spotwoke@gmail.com',
      subject: 'Sending another with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);

  } catch (e) {
    return failure({ status: false });
  }
}