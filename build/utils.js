'use strict'
const path = require('path')
const config = require('../config')

module.exports = {
  assetPath(_path) {
    const assetsSubDirectory =
      process.env.BUILDENV === 'dev' ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
  }
}
