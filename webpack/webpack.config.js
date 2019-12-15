const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolveApp } = require('./utils');
module.exports = {
  mode: 'development',
  entry: [resolveApp('./src/index.tsx')],
  output: {
    filename: 'bundle.js',
    path: resolveApp('/dist'),
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveApp('public/index.html'),
      inject: true,
      title: 'React App with tyepscript',
      filename: 'index.html'
    })
  ]
};
