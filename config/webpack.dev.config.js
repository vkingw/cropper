const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共配置
const MinCssExtractPlugin = require('mini-css-extract-plugin')

const devConfig = {
  mode: 'development', // 开发模式
  entry: path.join(__dirname, "../example/src/app.js"), // 项目入口，处理资源文件的依赖关系
  output: {
    path: path.join(__dirname, "../example/src/"),
    filename: "bundle.js", // 使用webpack-dev-sevrer启动开发服务时，并不会实际在`src`目录下生成bundle.js，打包好的文件是在内存中的，但并不影响我们使用。
  },
  module: {
    rules: [
      {
        test: new RegExp(`^(.*\\.global).*\\.css`),
        exclude: /\.min\.css$/,
        loader: ['style-loader', 'css-loader?modules'],
      },
      {
        test: new RegExp(`^(?!.*\\.global).*\\.css`),
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../example/src/'),
    compress: true,
    host: '192.168.204.183', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 3001, // 启动端口为 3001 的服务
    open: true // 自动打开浏览器
  },
};
module.exports = merge(devConfig, baseConfig); // 将baseConfig和devConfig合并为一个配置
