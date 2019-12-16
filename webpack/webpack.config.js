const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const { resolveApp } = require('./utils');
module.exports = {
  mode: 'development',
  entry: [resolveApp('./src/index.tsx')],
  output: {
    filename: 'js/bundle.js',
    path: resolveApp('/build'),
    chunkFilename: 'js/[name].chunk.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre', // 防止解析顺序错乱
        use: {
          loader: 'eslint-loader',
          options: {
            // cache: true,
          },
        },
        exclude: /node_modules/
      },
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
    }),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      watch: resolveApp('/src'),
      checkSyntacticErrors: true,
      silent: true // 不打印logger
    })
  ]
};
