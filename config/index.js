// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const versionDate = new Date()
const version = `${versionDate.getFullYear()}${(versionDate.getMonth()+1) >= 10 ? versionDate.getMonth()+1 : '0' + (versionDate.getMonth()+1)}${versionDate.getDate() >= 10 ? versionDate.getDate() : '0' + versionDate.getDate()}${versionDate.getHours() >= 10 ? versionDate.getHours() : '0' + versionDate.getHours()}${versionDate.getMinutes() >= 10 ? versionDate.getMinutes() : '0' + versionDate.getMinutes()}`;

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, `../dist/${version}/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist/${version}/`),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compressiovn-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
