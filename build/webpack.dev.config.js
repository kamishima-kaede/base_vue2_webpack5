const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');

const resolve = src => {
  return path.resolve(__dirname, '..', src);
};

module.exports = {
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
  entry: ['./src/index.js'],
  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // 修改公共路徑
    clean: true,
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.m?js$/,
        include: [resolve('src')],
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: '测试环境'
      // template: ''
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
};
