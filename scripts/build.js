process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const fs = require('fs-extra');
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
    console.log(err, stats);
  });
};

build();
