"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
function success(body) {
    return buildResponse(200, body);
}
exports.success = success;
function failure(body) {
    return buildResponse(500, body);
}
exports.failure = failure;
function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}
//# sourceMappingURL=response-lib.js.map