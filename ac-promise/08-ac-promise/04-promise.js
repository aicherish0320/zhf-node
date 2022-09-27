// 1. promise 是一个类
// 2. 当使用 promise 的时候，会传入一个执行器，此执行器是立即执行
// 3. 当前 executor ，给了两个函数可以来描述当前 promise 状态。promise 中有三个状态 成功态、失败态、等待态；默认是等待态，如果调用 resolve，会走到成功态，如果调用 reject，会发生异常，走失败态
// 4. 每个 promise 实例都有一个 then 方法

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            resolve(y)
          },
          (r) => {
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {}
  } else {
    resolve(x)
  }
}

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

    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
  }
  resolve(value) {
    if (this.status !== PENDING) return

    if (value instanceof Promise) {
      value.then(this.resolve, this.reject)
    }

    this.status = FULFILLED
    this.value = value
    // 发布
    this.onResolvedCallbacks.forEach((fn) => fn())
  }
  reject(reason) {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    // 发布
    this.onRejectedCallbacks.forEach((fn) => fn())
  }
  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : (v) => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error
          }

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulFilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        // PENDING
        // 代码异步调用
        // 订阅
        try {
          this.onResolvedCallbacks.push(() => {
            setTimeout(() => {
              const x = onFulFilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }, 0)
          })
        } catch (error) {
          reject(error)
        }

        try {
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }, 0)
          })
        } catch (error) {
          reject(error)
        }
      }
    })
    return promise2
  }
}

Promise.deferred = function () {
  let dfd = {}

  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })

  return dfd
}

module.exports = Promise
