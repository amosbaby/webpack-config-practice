const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')



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
      use: [ 
        // 'style-loader', // 通过动态添加style标签嵌入
        {
          loader:MiniCssExtractPlugin.loader,
          options:{
            publicPath:'//localhost:8000/'
          }
        }, // 通过文件引入嵌入
        'css-loader',
        //  {
        //   loader:'css-loader',
        //   options:{
        //     importLoaders:2,
        //     url:false
        //   }
        // },
        
        'postcss-loader',
        'sass-loader'] // 对应的css-loader名称
    },{
      test:/\.(jpe?g|png|gif)$/i,
      use:[
        
        // {
        //   loader:'file-loader',
        //   options:{
        //     name:'[name]_[contenthash:8].[ext]'
        //   }
        // },
        // 小于limit的就会转成base64，否则回退到file-loader,两者配其一即可
        {
          loader:'url-loader',
          options:{
            name:'[name]_[contenthash:8].[ext]',
            // 文件小于 50k 会转换为 base64，大于则拷贝文件
            limit:50*1024
          }
        }
      ]
    },
    
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({
    template:'./src/index.html'
    }),
   new CleanWebpackPlugin(),
   new MiniCssExtractPlugin({
     filename:'[name]_[contenthash:8].css'
   })
]
}


module.exports = (_,argv)=>{
  console.log('打包模式:',argv.mode)
  return  config
}
