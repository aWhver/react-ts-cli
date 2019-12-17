const { resolveApp } = require('./utils');

module.exports = {
  appSrc: resolveApp('src'),
  appEntry: resolveApp('src/index'),
  appBuild: resolveApp('build'),
  templateHtml: resolveApp('public/index.html'),
  public: resolveApp('public'),
};
