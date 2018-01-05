var utils = require('./utils')
var path = require('path');
var config = require('../config')

var sourceMap = null;
var extract = false;
var spritePath = null;
switch (process.env.NODE_ENV) {
  case 'production':
    sourceMap = config.build.productionSourceMap;
    spritePath = config.build.assetsRoot;
    extract = true;
    break;
  default:
    sourceMap = config.dev.productionSourceMap;
};

if (!spritePath) {
  module.exports = {
    loaders: utils.cssLoaders({
      sourceMap: sourceMap,
      extract: extract
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ["last 5 versions","ios 6","android 4","firefox > 15"]
      })
    ]
  }
} else {
  module.exports = {
    loaders: utils.cssLoaders({
      sourceMap: sourceMap,
      extract: extract
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ["last 5 versions","ios 6","android 4","firefox > 15"]
      }),
      require('postcss-easysprites')(
        {
          spritePath: spritePath + '/static/img/'
        }
      )
    ]
  }
}
