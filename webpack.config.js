var path = require('path');

module.exports = {
  entry: {
    './authorizer':   './functions/authorizer.ts',
    './spots/create':   './functions/spots/create.ts',
    // './spots/delete':   './functions/spots/delete.ts',
    './spots/get':      './functions/spots/get.ts',
    // './spots/list':     './functions/spots/list.ts',
    './spots/update':   './functions/spots/update.ts',
    './invites/text':   './functions/invites/text.ts',   
    './invites/email':   './functions/invites/email.ts',   
    './todos/create':   './functions/todos/create.ts',
    './todos/delete':   './functions/todos/delete.ts',
    './todos/get':      './functions/todos/get.ts',
    // './todos/list':     './functions/todos/list.ts',
    './todos/update':   './functions/todos/update.ts',
    // './stream/stream':  './functions/stream/stream.ts',
    // './stream/consumer':'./functions/stream/consumer.ts'
  },
  target: 'node',
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
};