function isType(val, typing) {
  return Object.prototype.toString.call(val) === `[object ${typing}]`
}

// console.log(isType('123', 'String'))
// console.log(isType(123, 'String'))

// ! 柯里化让函数变得更具体一些
// function isString(typing = 'String') {
//   return function (val) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`
//   }
// }

// function isNumber(typing = 'Number') {
//   return function (val) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`
//   }
// }

// console.log(isString()(1))
// console.log(isString()('1'))
// console.log(isNumber()(1))
// console.log(isNumber()('1'))

// ! 求和
function sum(a, b, c, d) {
  return a + b + c + d
}
// 我要记录每次调用时传入的参数，并且和函数的参数个数进行比较，如果不满足，就返回新函数；如果传入的个数和参数一致，执行原来的函数
function curring(fn) {
  const argumentLength = fn.length
  const newFn = (...args) => {
    if (args.length === argumentLength) {
      return fn.call(this, ...args)
    } else {
      return (...arg) => newFn(...arg, ...args)
    }
  }
  return newFn
}

// const s = curring(sum)
// console.log(s(1)(2)(3, 4))

// ! 判断元素类型 curry 化改造
// const isString = curring(isType)('String')
// const isNumber = curring(isType)('Number')

// console.log(isString(1))
// console.log(isString('1'))
// console.log(isNumber(1))
// console.log(isNumber('1'))

// ! 类型判断通用方法
const util = {}
;['Number', 'String', 'Null', 'Undefined'].forEach((type) => {
  util[`is${type}`] = curring(isType)(type)
})
console.log(util.isNumber(1))
console.log(util.isString('2'))
console.log(util.isNull(null))
