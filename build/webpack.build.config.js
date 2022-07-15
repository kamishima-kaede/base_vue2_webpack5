const path = require('path')
const webpack = require('webpack')
const { merge } = requier('webpack-merge')
const baseWebpackPlugin = require('./webapck.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpck-plugin')

const resolve = src => {
  return path.resolve(__dirname, '..', src)
}

module.exports = merge(baseWebpackPlugin, {
  mode: 'production', // development production
  devtool: false,
  output: {
    publicPath: '/', // 修改公共路徑
    filename: '[name].[contenthash].js',
    path: resolve('dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'static/asset/images/[name].[hash:7].[ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'static/asset/fonts/[name].[hash:7].[ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // kb
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      title: '生产环境'
    }),
    new MiniCssExtractPlugin({ filename: 'static/css/[name].[contenthash].css' }),
    new ESLintPlugin({
      fix: false,
      extensions: ['vue', 'js', 'mjs', 'json'],
      exclude: 'node-modules'
    })
    // new CopyWebpackPlugin({
    //   patterns: []
    // })
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: ['...', new CssMinimizerPlugin()]
  }
})
