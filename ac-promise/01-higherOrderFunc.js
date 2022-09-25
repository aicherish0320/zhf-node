// 高阶函数的概念：
// 1. 一个函数返回一个函数；2. 一个函数的参数可以接收一个函数
// 这两个条件满足任何一个均可，promise 内部肯定也是回调函数（内部包含着高阶函数）

// 扩展方法 会用到高阶函数

// 核心代码
function core(...args) {
  // TODO
  console.log('core', ...args)
  // TODO
}

// 给 core 函数增加一些额外的逻辑，但是不能更改核心代码
Function.prototype.before = function (cb) {
  // 剩余运算符
  return (...args) => {
    cb()
    // 扩展运算符
    this(...args)
  }
}

const newCore = core.before(() => {
  console.log('before-core')
})

newCore('a', 'b')

// 1. 如果我们想给函数进行扩展，可以使用高阶函数
