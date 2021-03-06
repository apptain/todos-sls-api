"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var aws_sdk_1 = require("aws-sdk");
var uuid_1 = require("uuid");
var dynamoDbLib = require("../../libs/dynamodb-lib");
var response_lib_1 = require("../../libs/response-lib");
function main(spot, context) {
    return __awaiter(this, void 0, void 0, function () {
        var data, params, accountId, queueUrl, responseBody, queueParams, sqs, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = JSON.parse(spot.body);
                    params = {
                        TableName: "spots",
                        Item: {
                            ownerId: spot.requestContext.identity.cognitoIdentityId,
                            spotId: uuid_1.default.v1(),
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dynamoDbLib.call("put", params)];
                case 2:
                    _a.sent();
                    accountId = context.invokedFunctionArn.split(":")[4];
                    queueUrl = 'https://sqs.us-east-1.amazonaws.com/' + accountId + '/spots';
                    responseBody = {
                        message: ''
                    };
                    queueParams = {
                        MessageBody: spot.body,
                        QueueUrl: queueUrl
                    };
                    sqs = new aws_sdk_1.default.SQS({
                        region: 'us-east-1'
                    });
                    return [2 /*return*/, sqs.sendMessage(params, function (err, data) {
                            if (err) {
                                console.log('error:', "failed to send message" + err);
                                var responseCode = 500;
                            }
                            else {
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
                            if (response) {
                                return response_lib_1.success(queueParams.Item);
                            }
                            //callback(null, response);
                        })];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, response_lib_1.failure({ status: false })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=create.js.map