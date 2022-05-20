module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets:{
            browsers: ["last 2 versions"]
        }
      }
    ]
  ],
  sourceType:"unambiguous" // 解决ES6和CommonJS模块导出的问题: https://babeljs.io/docs/en/options#sourcetype
}
