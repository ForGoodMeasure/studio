const merge = require('webpack-merge');
const { serverConfig, browserConfig } = require('./webpack.common.js');

module.exports = [
  merge(serverConfig, {
    output: {
      filename: 'server-bundle-dev.js'
    }
  }),
  merge(browserConfig, {
    devtool: 'inline-source-map',
    output: {
      filename: 'browser-bundle-dev.js'
    }
  })
];
