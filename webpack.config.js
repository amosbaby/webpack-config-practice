const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode:'development', // 运行模式，可被命令行覆盖
  entry:'./src/index.js', // 入口文件
  output:{
    filename:'bundle.js', // 输出文件名
    path:path.join(__dirname,'dist') // 输出目录
  },
  module:{
    rules:[{
      test:/\.css$/, // 匹配所有的css文件,
      use: 'css-loader' // 对应的css-loader名称
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
    template:'./src/index.html'
    }),
   new CleanWebpackPlugin()
]
}
