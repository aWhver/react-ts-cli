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
      console.log(chalk.red('编译过程中产生以下错误'));
      console.log();
      messages.errors.forEach(message => {
        console.log(chalk.red(message));
        console.log();
      });
      console.log(chalk.red('编译失败！,请仔细阅读错误提示，修改后再次编译'));
    }
    if (messages.warnings.length) {
      console.log(chalk.yellow('编译过程中产生以下警告'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(chalk.yellow(message));
        console.log();
      });
      console.log(chalk.cyan('你可以使用以下注释来忽略警告.'));
      console.log(chalk.cyan(`
        使用 /* eslint-disable */
        忽略整个文件
      `));
      console.log(chalk.cyan(`
        使用 // eslint-disable-next-line
        忽略下一行
      `));
    }
  });
};

build();
