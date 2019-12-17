const path = require('path');
const resolveApp = _path => path.resolve(_path);
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const isProductionEnv = process.env.NODE_ENV === 'production';

function getStyleLoaders(cssOption = {}, preLoader) {
  const loaders = [
    require.resolve('style-loader'),
    isProductionEnv && {
      loader: miniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOption
    }
  ].filter(Boolean);
  if (preLoader) {
    const preLoaders = [
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: [
            require('postcss-flexbugs-fixes'),
            postcssPresetEnv({
              stage: 3, // 使用第三阶段的css特性
              autoprefixer: { // 自动添加浏览器前缀
                grid: true,
                flexbox: 'no-2009'
              }
            }),
            postcssNormalize()
          ]
        }
      },
      {
        loader: require.resolve(preLoader),
        options: {
          sourceMap: true,
        },
      }
    ];
    loaders.splice(loaders.length, 0, ...preLoaders);
  }
  return loaders;
}

module.exports = {
  resolveApp,
  getStyleLoaders
};
