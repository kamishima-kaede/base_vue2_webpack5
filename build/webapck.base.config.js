const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.config')

const resolve = src => {
  return path.resolve(__dirname, '..', src)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['./src/main.js'],
  output: {
    publicPath: '/', // 修改公共路徑
    filename: '[name].[contenthash].js',
    path: resolve('dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.json', 'vue'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        include: [resolve('src')],
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig
          }
        ]
      },
      {
        test: /\.m?js$/i,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      // {
      //   test: /\.svg$/i,
      //   use: {
      //     loader: 'svg-split-loader',
      //     options: {
      //       symbolId: 'icon-[name]'
      //     }
      //   },
      //   include: resolve('src/icons')
      // }
    ]
  },
  plugins: [new VueLoaderPlugin(), new NodePolyfillPlugin()],
  target: 'browserslist'
}
