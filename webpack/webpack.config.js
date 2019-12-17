const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const { getStyleLoaders } = require('./utils');
const { appSrc, appEntry, appBuild, templateHtml } = require('./paths');
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [appEntry],
  output: {
    filename: 'js/bundle.js',
    path: appBuild,
    chunkFilename: isProductionEnv
      ? 'js/[name].[contenthash:8].chunk.js'
      : 'js/[name].chunk.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  devtool: isProductionEnv
    ? 'source-map'
    : isDevelopmentEnv && 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre', // 防止解析顺序错乱
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true
          }
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
      },
      {
        test: /\.js$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(),
        sideEffects: true
      },
      {
        test: /\.less$/,
        use: getStyleLoaders(
          {
            importLoaders: 1
          },
          'less-loader'
        )
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: templateHtml,
      inject: true,
      title: 'React App with tyepscript',
      filename: 'index.html'
    }),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      watch: appSrc,
      checkSyntacticErrors: true,
      silent: true // 不打印logger
    })
  ]
};
