const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
      // relative to config folder
    filename: '[name]',
    path: path.join(common.context, 'public')
      // publicPath eklemezsek tarayıcıda sorun veriyor: 'Automatic publicPath is not supported in this browser';
      // publicPath: path.join(context, 'public'),
  },
});