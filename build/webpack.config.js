const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  console.log('当前环境变量', env);
  return {
    mode: 'production', // development production
    // devtool: 'eval-cheap-module-source-map',
    devServer: {
      static: {
        publicPath: ''
      },
      compress: true, // gzip压缩
      port: 9991,
      hot: true,
      open: true,
      client: {
        logging: 'error',
        overlay: false,
        reconnect: 10
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
          changeOrigin: true
        }
      }
    },
    optimization: {
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: 'single'
    },
    entry: ['./src/index.js'],
    output: {
      filename: 'js/[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // 修改公共路徑
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.less$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'static/[hash][ext][query]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // kb
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset'
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({ title: '打包测试' }), new MiniCssExtractPlugin({ filename: 'css/[name].css' })]
  };
};
