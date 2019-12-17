const { resolveApp } = require('./utils');

module.exports = {
  appSrc: resolveApp('src'),
  appEntry: resolveApp('src/index'),
  appBuild: resolveApp('public'),
  templateHtml: resolveApp('public/index.html'),
};
