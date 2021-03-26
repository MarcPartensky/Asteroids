// module = {
//   entry: './client.js',
//   output: {
//     filename: 'main.js',
//   },
// };

// export module;


const path = require('path');

module.exports = {
      entry: './models/client.js',
    mode:"development",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: new RegExp('[libs|models]*\.js'), use: 'raw-loader' }
    ]
  },
};