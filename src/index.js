import '~/main.css'
import '~/sass.scss'
// 引入字体文件
import '@fonts/iconfont'

import logo from '../public/logo.png'


const msg = 'Hello'
console.log(msg)

const img = new Image()
img.src = logo
document.getElementById('img-box').appendChild(img)
// 新增装饰器
@log('hi')
class Person{

  pick = (thing)=>{
    console.log('pick ', thing)
  }
}

function log(msg){
  return function(target){
    target.prototype.logger = ()=> `${msg},${target.name}`
  }
}

const p = new Person()
p.pick('shit')
p.logger()

function unusedFn(){
  console.log('啊哈，无用代码11')
}

module.exports = msg
