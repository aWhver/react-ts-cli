const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TestAsyncPlugin = require('./plugins/plugin1');
// const TestAsyncPlugin = require('./plugins/plugin2');
const safePostCssParser = require('postcss-safe-parser');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const { getStyleLoaders, resolveApp } = require('./utils');
const { appSrc, appEntry, appBuild, templateHtml } = require('./paths');
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [appEntry],
  output: {
    filename: isProductionEnv ? 'js/[name].[contenthash:8].js' : 'js/bundle.js',
    path: appBuild,
    chunkFilename: isProductionEnv
      ? 'js/[name].[contenthash:8].chunk.js'
      : 'js/[name].chunk.js',
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    jsonpFunction: `webpackJsonp-react-ts-cli`,
  },
  devtool: isProductionEnv
    ? 'source-map'
    : isDevelopmentEnv && 'cheap-module-source-map',
  optimization: {
    minimize: isProductionEnv,
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            // `inline: false` forces the sourcemap to be output into a
            // separate file
            inline: false,
            // `annotation: true` appends the sourceMappingURL to the end of
            // the css file, helping the browser find the sourcemap
            annotation: true,
          },
        },
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   name: false,
    // },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre', // 防止解析顺序错乱
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoaders({
          modules: true,
        }),
        sideEffects: true,
      },
      {
        test: /\.less$/,
        use: getStyleLoaders(
          {
            importLoaders: 1,
          },
          'less-loader'
        ),
      },
      {
        test: /\.(png|gif|jp?eg|webp|bmp)$/i,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 8192,
            name: 'media/[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      controller: resolveApp('src/controller'),
      images: resolveApp('src/images'),
      routers: resolveApp('src/routers'),
      utils: resolveApp('src/utils'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    hot: true,
    contentbase: '../build',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: templateHtml,
      inject: true,
      title: 'React App with tyepscript',
      filename: 'index.html',
    }),
    new TestAsyncPlugin({ name: 'inigo' }),
    isProductionEnv &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
    isDevelopmentEnv && new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      watch: appSrc,
      checkSyntacticErrors: true,
      silent: true, // 不打印logger
    }),
    isDevelopmentEnv && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean),
  performance: false,
};
