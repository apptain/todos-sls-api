const AWS = require("aws-sdk");
const {createServer} = require('dynamodb-admin');

const dynamodbOfflineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
};

AWS.config.update(dynamodbOfflineOptions);
const dynamodb = new AWS.DynamoDB();
const client = new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions);
const app = createServer(dynamodb, client);

const port = 8001;
const server = app.listen(port);

server.on('listening', () => {
    const address = server.address();
    console.log(`  listening on http://0.0.0.0:${address.port}`);
});