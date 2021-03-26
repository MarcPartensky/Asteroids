const path = require('path');

module.exports = {
      entry: './models/client.js',
      mode:"development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
          { test: /\.js$/, use: 'raw-loader' }//new RegExp('[libs|models]*\.js')
    ]
  },
};