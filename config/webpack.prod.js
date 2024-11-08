const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    // minimize: false
  },
  output: {
    path: path.join(common.context, 'public'),
    filename: '[name]',
    // so that modules are not extracted as separate files.
    chunkFormat: false,
    // if the globalObject does not have "this" value, it gives an error when called as module.
    globalObject: 'this',
    library: {
      type: 'umd'
    }
  }
});
