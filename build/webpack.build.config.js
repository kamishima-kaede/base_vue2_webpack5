'use strict'
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackPlugin = require('./webapck.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const EnvConfig = require(`../config/${process.env.BUILDENV.trim()}.env`)
const config = require('../config')
const utils = require('./utils')

// const resolve = src => {
//   return path.resolve(__dirname, '..', src)
// }

const buildConfig = merge(baseWebpackPlugin, {
  mode: 'production', // development production
  devtool: config.build.devtool,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetPath('js/[name].[contenthash].js'),
    chunkFilename: utils.assetPath('js/[name].[contenthash].js'),
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
          filename: utils.assetPath('static/asset/images/[name].[hash:7].[ext]')
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
          filename: utils.assetPath('static/asset/fonts/[name].[hash:7].[ext]')
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
    new webpack.DefinePlugin({
      'process.env': EnvConfig
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'public/index.html',
      title: '生产环境',
      inject: true,
      minify: true,
      chunksSortMode: 'auto'
    }),
    new MiniCssExtractPlugin({ filename: 'static/css/[name].[contenthash].css' }),
    new ESLintPlugin({
      fix: false,
      extensions: ['vue', 'js', 'mjs', 'json'],
      exclude: 'node_modules'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/static'),
          to: config.build.assetsSubDirectory + 'static'
        }
      ]
    })
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
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
})

if (config.build.prodectionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  buildConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  buildConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = buildConfig
