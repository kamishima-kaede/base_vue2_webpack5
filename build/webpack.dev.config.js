const path = require('path')
const webpack = require('webpack')
const { merge } = requier('webpack-merge')
const baseWebpackPlugin = require('./webapck.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const resolve = src => {
  return path.resolve(__dirname, '..', src)
}

module.exports = merge(baseWebpackPlugin, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      publicPath: ''
    },
    port: 9991,
    hot: true,
    open: true
    // client: {
    //   logging: 'error',
    //   overlay: false,
    //   reconnect: 10
    // },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' },
    //     changeOrigin: true
    //   }
    // }
  },
  watchOptions: {
    aggregateTimeout: 1000, // 将设置时间内的文件更改合并倒一起更新
    poll: 1000, // 监听文件修改轮询时间
    ignored: '**/node_modules' // 设置dev-server忽略监听的目录
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'vue-style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, esModule: false, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'vue-style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2, esModule: false, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        exclude: [resolve('src/icons')]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      title: '测试环境'
    }),
    new ESLintPlugin({
      fix: true,
      extensions: ['vue', 'js', 'mjs', 'json'],
      exclude: 'node-modules'
    })
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: true
  }
})
