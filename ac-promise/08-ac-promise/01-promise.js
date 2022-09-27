// 1. promise 是一个类
// 2. 当使用 promise 的时候，会传入一个执行器，此执行器是立即执行
// 3. 当前 executor ，给了两个函数可以来描述当前 promise 状态。promise 中有三个状态 成功态、失败态、等待态；默认是等待态，如果调用 resolve，会走到成功态，如果调用 reject，会发生异常，走失败态
// 4. 每个 promise 实例都有一个 then 方法

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING

    this._initBind()
    this._initValue()
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  _initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  _initValue() {
    this.value = undefined
    this.reason = undefined
  }
  resolve(value) {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
  }
  reject(reason) {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
  }
  then(onFulFilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulFilled(this.value)
    } else if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

module.exports = Promise
