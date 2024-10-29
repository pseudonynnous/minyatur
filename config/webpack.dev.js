const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    // relative to config folder
    filename: '[name]',
    path: path.join(common.context, 'build')
    // publicPath eklemezsek tarayıcıda sorun veriyor: 'Automatic publicPath is not supported in this browser';
    // publicPath: path.join(context, 'public'),
  },
  devServer: {
    devMiddleware: {
      // index: true,
      // mimeTypes: { "text/html": ["phtml"] },
      publicPath: '/build'
      // serverSideRender: true,
      // writeToDisk: true,
    },
    watchFiles: [
      path.join(common.context, 'source'),
      /* path.join(projectBaseFolder, 'public/include'),
      path.join(projectBaseFolder, 'source'),
      path.join(projectBaseFolder, '../source') */
      ],
    /* allowedHosts: [
      'local-dkn'
      ], */
    // Bunu yapmazsak CORS hatası veriyor. yukarıdaki adresten erişemiyoruz, sayfayı yenilemiyor.
    headers: {
      'Access-Control-Allow-Origin': '*'
      // "Access-Control-Allow-Methods": "GET",
      // "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    hot: true,
    // inline: true,
    // liveReload: true,
    compress: true,
    open: {
      target: ['https://localhost:9000'],
      app: {
        name: 'google-chrome'
        // arguments: [""],
      }
    },
    // 0.0.0.0 dışarıdan da ulaşılabiliyor. sadece localhost yazarsak hayır.
    host: '0.0.0.0',
    port: 9000,
    server: 'https',
    webSocketServer: 'sockjs',
    static: {
      directory: path.join(common.context, 'build'),
    },
    // inline: false,
    client: {
      overlay: {
        errors: true,
        warnings: true,
        runtimeErrors: false
      }
    }
  }
});