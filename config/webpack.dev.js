const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    // relative to config folder.
    filename: '[name]',
    path: path.join(common.context, 'build'),
     // so that modules are not extracted as separate files.
    chunkFormat: false
    // if we do not add publicPath, it gives problems in the browser: 'Automatic publicPath is not supported in this browser'.
    // publicPath: path.join(context, 'public'),
  },
  devServer: {
    devMiddleware: {
      // index: true,
      // mimeTypes: { "text/html": ["phtml"] },
      publicPath: '/instant-compiled-folder'
      // serverSideRender: true,
      // writeToDisk: true,
    },
    watchFiles: [
      path.join(common.context, 'source')
      /* path.join(projectBaseFolder, 'public/include'),
      path.join(projectBaseFolder, 'source'),
      path.join(projectBaseFolder, '../source') */
    ],
    /* allowedHosts: [
      'local-dkn'
      ], */
    // if we do not do this, it gives a CORS error. We cannot access the address above, it does not refresh the page.
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
    // when you enter 0.0.0.0, it can be accessed from outside. If we only write localhost, then no.
    host: '0.0.0.0',
    port: 9000,
    server: 'https',
    webSocketServer: 'sockjs',
    // the folder that the first index.html is looking for
    static: [
      { directory: path.join(common.context, 'build') },
      { directory: path.join(common.context, 'site/assests') }
    ],
    // if it can't find an index in the main folder, it looks here. That is, the index.html location.
    /* historyApiFallback: {
      index: '/build/index.html'
    }, */
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
