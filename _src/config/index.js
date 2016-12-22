var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../site/index.html'),
    assetsRoot: path.resolve(__dirname, '../../site'),
    assetsSubDirectory: 'static',
    dataSubDirectory: 'data',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    dataSubDirectory: 'data',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
