const path = require('path');
const glob = require('glob');
const fs = require('fs');

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// ProjectBaseFolder
const context = path.join(__dirname, '..');

const javascriptSourceMap = {
  'minyatur.js': path.join(context, 'source/javascript/minyatur.js')
};

const styleSourceMap = {
  'minyatur.junk': path.join(context, 'source/stylesheet/minyatur.scss')
};

const sourceMap = { ...javascriptSourceMap, ...styleSourceMap };

const eslintOptions = {
  context,
  extensions: ['js'],
  exclude: [
    '/node_modules/'
  ],
  overrideConfigFile: path.join(context, 'config/.eslintrc.js')
};

const JunkExtensionFilesRemoverAfterCompile = function() {
  // https://stackoverflow.com/questions/58325548/how-to-execute-my-own-script-after-every-webpacks-auto-build-in-watch-mode-of-v
  this.apply = function(compiler) {
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap('webpack-arbitrary-code', () => {
        Object.keys(styleSourceMap).forEach(key => {
          const destination = [
            'public',
            'build'
          ];

          destination.forEach(value => {
            const sourcePath = path.join(context, value, key);

            if (path.extname(sourcePath) == '.junk') {
              fs.unlink(path.join(context, value, key), () => {});
            }
          });
        });
      });
    }
  };
};

module.exports = {
  // relative to root folder
  context,
  entry: sourceMap,
  plugins: [
    new ESLintPlugin(eslintOptions),
    new MiniCssExtractPlugin({
      // https://stackoverflow.com/questions/55677070/webpack-mini-css-extract-plugin-output-multiple-css-files-on-single-entry
      filename: ({ chunk }) => `${chunk.name.replace(/\.junk$/, '.css')}`
    }),
    new JunkExtensionFilesRemoverAfterCompile()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          configFile: path.join(context, 'config/babel.config.js')
        }
      }]
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            api: 'modern'
          }
        }
      ]
    }
    ]
  }
};
