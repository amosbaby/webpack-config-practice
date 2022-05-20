module.exports = {
  presets: [
    [
      "@babel/preset-env",
      { 
         // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
        // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
        useBuiltIns: "entry",
        corejs:"3.9.1",
        targets:{
            chrome:"58",
            ie:"11",
            browsers: ["last 2 versions"]
        }
      }
    ]
  ],
  plugins:[
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  sourceType:"unambiguous" // 解决ES6和CommonJS模块导出的问题: https://babeljs.io/docs/en/options#sourcetype
}
