const path = require('path')

module.exports = {
  mode:'development', // 运行模式，可被命令行覆盖
  entry:'./src/main.css', // 入口文件
  output:{
    filename:'bundle.css', // 输出文件名
    path:path.join(__dirname,'dist') // 输出目录
  },
  module:{
    rules:[{
      test:/\.css$/, // 匹配所有的css文件,
      use: 'css-loader' // 对应的css-loader名称
    }]
  }
}
