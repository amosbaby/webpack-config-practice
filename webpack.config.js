const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


console.log('process.env.NODE_ENV:',process.env.NODE_ENV)

const config = {
  mode:'development', // 运行模式，可被命令行覆盖
  entry:'./src/index.js', // 入口文件
  output:{
    filename:'bundle.js', // 输出文件名
    path:path.join(__dirname,'dist') // 输出目录
  },
  devServer:{
    contentBase:path.resolve(__dirname,'public') ,//静态文件目录
    compress:true, // 是否启动gzip压缩
    port:8000, // 端口号,
    open :false // 是否打开浏览器
  },
  module:{
    rules:[{
      test:/\.(sc|sa|c)ss$/, // 匹配所有的sass/scss/css文件,
      use: ['style-loader','css-loader','postcss-loader','sass-loader'] // 对应的css-loader名称
    }
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({
    template:'./src/index.html'
    }),
   new CleanWebpackPlugin()
]
}


module.exports = (_,argv)=>{
  console.log('打包模式:',argv.mode)
  return  config
}
