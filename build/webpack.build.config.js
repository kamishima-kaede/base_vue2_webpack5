const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const resolve = src => {
  return path.resolve(__dirname, '..', src);
};

module.exports = env => {
  console.log('当前环境变量', env);
  return {
    mode: 'production', // development production
    devtool: false,
    entry: ['./src/index.js'],
    output: {
      publicPath: '/', // 修改公共路徑
      filename: '[name].[contenthash].js',
      path: resolve('dist'),
      clean: true
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
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader'
          ],
          generator: {
            filename: 'static/css/[hash][ext][query]'
          }
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
          ],
          generator: {
            filename: 'static/css/[hash][ext][query]'
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'static/asset/images/[hash][ext][query]'
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
            filename: 'static/asset/fonts/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'build'
        // template: ''
      }),
      new MiniCssExtractPlugin({ filename: 'static/css/[name].[contenthash].css' }),
      new ESLintPlugin({
        fix: true,
        extensions: ['vue', 'js', 'mjs', 'json'],
        exclude: 'node-modules'
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
      minimizer: ['...', new CssMinimizerPlugin()]
    },
    target: 'browserslist'
  };
};
