import './main.css'
import './sass.scss'
// 引入字体文件
import './fonts/iconfont.css'

import logo from '../public/logo.png'


const msg = 'Hello'
console.log(msg)

const img = new Image()
img.src = logo
document.getElementById('img-box').appendChild(img)

class Person{

  pick = (thing)=>{
    console.log('pick ', thing)
  }
}

const p = new Person()
p.pick('shit')

module.exports = msg
