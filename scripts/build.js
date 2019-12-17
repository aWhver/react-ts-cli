process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const fs = require('fs-extra');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const { appBuild, public, templateHtml } = require('../webpack/paths');
const webpackConfig = require('../webpack/webpack.config');

// 将public下除html的资源copy至build下
function copyPublicFolder() {
  fs.copySync(public, appBuild, {
    dereference: true,
    filter: file => file !== templateHtml
  });
}

function build() {
  // 清空文件夹内容
  fs.emptyDirSync(appBuild);
  copyPublicFolder();
  const complier = webpack(webpackConfig);
  complier.run((err, stats) => {
    let messages;
    if (err) {
      if (!err.message) {
        console.log(chalk.red())
        return new Error(err);
      }
      messages = formatWebpackMessages({
        errors: [err.message],
        warnings: []
      });
    } else {
      const statsJson = stats.toJson({
        all: false,
        warnings: true,
        errors: true,
        timings: true
      });
      messages = formatWebpackMessages(statsJson);
      const isComplieSuccessfully = !messages.warnings.length && !messages.errors.length;
      if (isComplieSuccessfully) {
        console.log(chalk.green(`打包成功！compile time: ${(statsJson.time/1000).toFixed(2)}s`))
      }
    }
    if (messages.errors.length) {
      messages.errors.forEach(message => {
        console.log(chalk.red(message));
        console.log();
      });
    }
    if (messages.warnings.length) {
      messages.warnings.forEach(message => {
        console.log(chalk.yellow(message));
        console.log();
      });
    }
  });
};

build();
