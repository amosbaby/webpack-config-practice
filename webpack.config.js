const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

const smp = new SpeedMeasurePlugin()


console.log('process.env.NODE_ENV:',process.env.NODE_ENV)

// 路径处理方法
function resolve(dir){
  return path.join(__dirname,dir)
}

const config = {
  mode:'development', // 运行模式，可被命令行覆盖
  entry:'./src/index.js', // 入口文件
  devtool:'eval-source-map',
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
  resolve:{
    // 配置别名
    alias:{
      '~':resolve('src'),
      '@':resolve('src'),
      '@fonts':resolve('src/fonts')
    },
    // 引入模块时可以忽略一下扩展名 https://webpack.js.org/configuration/resolve/
    extensions:['.js','.json','.wasm'],
    // 告诉webpack解析模块时需要搜索的目录
    // 告诉webpack优先搜索src，可以大幅节省查找时间
    modules:[resolve('src'),'node_modules'] 
  },
  module:{
    noParse:/jquery|lodash/, // 不需要解析依赖的第三方大型类库，可通过该配置，提高构建速度
    rules:[
      {
        test:/\.js$/,
        include:resolve('src'),
        exclude:/node_modules/,
        use:[
          // {
          //   loader: 'thread-loader', // 配置在其后的loader都处于一个单独的worker pool中, 对于小型项目不太实用，有额外的worker pool开销，反而会耗时更多
          //   options:{
          //     worker:3
          //   }
          // }
          
          {
            loader: 'babel-loader',
            options:{
              presets:[
                '@babel/preset-env'
              ],
              cacheDirectory:true // 启用缓存
            }
          }
        ]
      },
      {
      test:/\.(sc|sa|c)ss$/, // 匹配所有的sass/scss/css文件,
      include:resolve('src'),
      exclude:/node_modules/,
      use: [ 
        // 'style-loader', // 通过动态添加style标签嵌入
        MiniCssExtractPlugin.loader,
        // {
        //   loader:MiniCssExtractPlugin.loader,
        //   options:{
        
        //   }
        // }, // 通过文件引入嵌入
        'cache-loader', // 获取前面 loader 转换的结果
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
      type:'asset',
      generator:{
        // 输出文件位置以及文件名
        filename:'[name]_[contenthash:8].[ext]'
      },
      parser:{
        dataUrlCondition:{
          // 文件小于 50k 会转换为 base64，大于则拷贝文件
          maxSize: 10 * 1024
        }
      }
      // use:[
        
        // {
        //   loader:'file-loader',
        //   options:{
        //     name:'[name]_[contenthash:8].[ext]'
        //   }
        // },
        // 小于limit的就会转成base64，否则回退到file-loader,两者配其一即可
        // {
        //   loader:'url-loader',
        //   options:{
        //     name:'[name]_[contenthash:8].[ext]',
        //     // 文件小于 50k 会转换为 base64，大于则拷贝文件
        //     limit:50*1024
        //   }
        // }
      // ]
    },{
      test:/\.(woff2?|eot|ttf|otf)$/i,
      type:'asset',
      generator:{
        // 输出文件位置以及文件名
        filename:'[name]_[contenthash:8].[ext]'
      },
      parser:{
        dataUrlCondition:{
          // 文件小于 10k 会转换为 base64，大于则拷贝文件
          maxSize: 1110 * 1024
        }
      }
      // use:[
      //   {
      //     loader:'url-loader',
      //     options:{
      //       // 体积大于 10KB 打包到 fonts 目录下
      //       name:'fonts/[name]_[contenthash:8].[ext]',
      //       limit:10*1024
      //     }
      //   }
      // ]

    }
    
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({
    template:'./src/index.html'
    }),
   new CleanWebpackPlugin(),
   new webpack.IgnorePlugin({
     resourceRegExp:/^\.\/locale$/, // 排除掉moment包中的非中文语音，大大节省打包体积
     contextRegExp:/moment$/
   }),
   new BundleAnalyzerPlugin({
      analyzerMode:'disabled', // 不启动展示打包报告的http服务器
    //  generateStatsFile:true // 是否生成stats.json文件
   })
]
}


module.exports = (_,argv)=>{
  console.log('打包模式:',argv.mode)
  const tempConfig =  smp.wrap(config)
  tempConfig .plugins.push(  new MiniCssExtractPlugin({
    filename:'[name]_[contenthash:8].css'
  })) 

  return tempConfig
}
