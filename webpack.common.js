const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.serverConfig = {
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  entry: {
    server: './src/server/index.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist/server'),
    library: 'handler',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: [
            "transform-class-properties",
            ["inline-json-import", {}],
            "styled-components"
          ]
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};

exports.browserConfig = {
  target: 'web',
  entry: './src/browser/index.js',
  output: {
    filename: 'browser-bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: [
            "transform-class-properties",
            ["inline-json-import", {}],
            "styled-components"
          ]
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
}

exports.adminAppConfig = {
  target: 'web',
  entry: './src/admin/index.js',
  output: {
    filename: 'admin-bundle.js',
    path: path.resolve(__dirname, 'dist/assets/js')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ["transform-class-properties", ["inline-json-import", {}]]
        }
      }
    ]
  }
}
