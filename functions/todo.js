"use strict";

var Promise = require("bluebird");
var db = require("../database/dynamodb");
import { success, failure } from "../../libs/response-lib";

const DB_PREFIX = process.env.IS_OFFLINE ? "dev" : process.env.DB_PREFIX;

const response = (status, data) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  };
};

export async function createTodo(event, context) {
  const data = JSON.parse(event.body);
  db("put", {
    TableName: DB_PREFIX + "-todos",
    Item: {
      id: data.id,
      task: data.task,
      isCompleted: data.isCompleted
    }
  })
  .then(result => {
    return success({});
  })
  .catch(err => {
    return failure({ status: false });
  });
};

export async function getAllTodos(event, context) {
  db("scan", {
      TableName: DB_PREFIX + "-todos"
  }).then(todos => {
    return success(todos);
  })
  .catch(err => {
    return failure({ status: false });
  });
};

export async function updateTodo(event, context) {
  const data = JSON.parse(event.body);
  db("update", {
    TableName: DB_PREFIX + "-todos",
    Key: {
      id: data.id
    },
    UpdateExpression: "set task = :task",
    ExpressionAttributeValues: {
      ":task": data.task
    }
  })
  .then(result => {
    cb(null, response(200, {}));
  })
  .catch(err => {
    cb(
      null,
      response(500, {
        err: err
      })
    );
  });
};

export async function deleteTodo(event, context) {
  const id = event.pathParameters.id;
  db("delete", {
    TableName: DB_PREFIX + "-todos",
    Key: {
      id
    }
  })
  .then(result => {
    cb(null, response(200, {}));
  })
  .catch(err => {
    cb(
      null,
      response(500, {
        err: err
      })
    );
  });
};
