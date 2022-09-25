// 函数柯里化，多个参数的传入 把它转化成 n 个函数，可以暂存变量
// 一般柯里化参数要求都是一个一个的传
// add(1)(2, 3) => 偏函数

function sum(a, b) {
  return a + b
}

function minus(a, b) {
  return a - b
}

console.log('sum(1, 2) >>> ', sum(3, 2))

function curry(fn) {
  const argsLen = fn.length
  const newFn = (...args) => {
    if (args.length === argsLen) {
      return fn.call(this, ...args)
    } else {
      return (...arg) => newFn(...args, ...arg)
    }
  }
  return newFn
}

const newSum = curry(sum)
console.log('newSum >>> ', newSum(3, 2))
console.log('newSum >>> ', newSum(3)(2))
