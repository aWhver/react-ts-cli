const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const chalk = require('chalk');
const webpackConfig = require('../webpack/webpack.config');
const port = '5600';

const complier = webpack(webpackConfig);
const openUrl = `http://localhost:${port}`;

complier.plugin('invalid', () => {
  clearConsole();
  console.log(chalk.green('编译中...'));
});

complier.plugin('done', stats => {
  clearConsole();
  const json = stats.toJson({}, true);
  const messages = formatWebpackMessages(json);
  const isComplieSuccess = !messages.errors.length && !messages.warnings.length;

  if (isComplieSuccess) {
    if (json.stats) {
      console.log('编译成功!');
    } else {
      console.log(
        chalk.green(
          `编译成功，build use time: ${(json.time / 1000).toFixed(2)}s`
        )
      );
      console.log();
    }
    openBrowser(openUrl);
  }

  if (messages.errors.length) {
    console.log(chalk.red('编译失败！'));
    messages.errors.forEach(message => {
      console.log(message);
      console.log();
    });
  }
  if (messages.warnings.length) {
    console.log(chalk.yellow('编译过程中产生警告.'));
    console.log();
    messages.warnings.forEach(message => {
      console.log(message);
      console.log();
    });
    console.log('你可以使用如下代码忽略这些警告.');
    console.log(
      `使用 ${chalk.yellow('// eslint-disable-next-line')} 忽略下一行的警告.`
    );
    console.log(
      `使用 ${chalk.yellow('/* eslint-disable */')} 忽略整个文件的警告.`
    );
    console.log();
  }
});

const devServer = new webpackDevServer(complier, {
  disableHostCheck: true,
  compress: true,
  hot: true,
  quiet: true,
  overlay: false,
  before(app, server) {
    app.use(evalSourceMapMiddleware(server));
    app.use(errorOverlayMiddleware());
  }
});

devServer.listen(port, '0.0.0.0', err => {
  if (err) {
    return console.log(err);
  }
});
