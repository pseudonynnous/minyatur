const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: false
  },
  output: {
    path: path.join(common.context, 'public'),
    filename: '[name]',
    chunkFormat: false,
    globalObject: 'this',
    library: {
      type: 'umd'
    }
  }
});
