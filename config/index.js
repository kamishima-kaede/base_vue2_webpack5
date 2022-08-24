'use strict'

const path = require('path')
const envPublicPath = process.env.PUBLICPATH || '/'
const ASSETSPUBLICPATH = envPublicPath

module.exports = {
  dev: {
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: [
      // 代理配置
      // { }
    ],
    host: '127.0.0.1',
    port: 8080,
    autoOpenBrowser: true,
    devtool: 'eval-cheap-module-source-map'
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './',
    assetsPublicPath: ASSETSPUBLICPATH,
    devtool: false,
    prodectionGzip:true,
    bundleAnalyzerReport:false
  }
}
