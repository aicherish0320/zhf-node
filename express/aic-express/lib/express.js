const Application = require('./application')

// 创建应用 每次 express() 执行 都能创建应用
function createApplication() {
  return new Application()
}

module.exports = createApplication
