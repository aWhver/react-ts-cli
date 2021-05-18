const pluginName = 'TestAsyncPlugin';

class TestAsyncPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // compiler.hooks.run.tap(pluginName, compilation => {
    //   console.log('webpack 构建过程开始！');
    // });
    compiler.plugin('emit', function (compilation, callback) {
      // 处理完毕后执行 callback 以通知 Webpack
      // 如果不执行 callback，运行流程将会一直卡在这不往下执行
      setTimeout(() => {
        console.log(4);
        callback();
      }, 2000);
    });
  }
}

module.exports = TestAsyncPlugin;