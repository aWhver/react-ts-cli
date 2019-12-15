const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config');
const port = '5600';

const complier = webpack(webpackConfig);
const devServer = new webpackDevServer(complier, {
  disableHostCheck: true,
  compress: true,
  open: true,
  liveReload: true,
  hot: false,
  quiet: true
});

devServer.listen(port, '0.0.0.0', err => {
  if (err) {
    return console.log(err)
  }
});
