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
    if (value instanceof Promise) {
      return value.then(this.resolve, this.reject)
    }

    if (this.status !== PENDING) return

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
  catch(errorFn) {
    return this.then(null, errorFn)
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }
  static all(args) {
    return new Promise((resolve, reject) => {
      const ret = []
      let times = 0

      function processSuccess(index, value) {
        ret[index] = value
        if (++times === args.length) {
          resolve(ret)
        }
      }

      args.forEach((arg, index) => {
        if (typeof arg.then === 'function') {
          // promise
          arg.then(
            (data) => {
              processSuccess(index, data)
            },
            (error) => {
              reject(error)
            }
          )
        } else {
          processSuccess(index, arg)
        }
      })
    })
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
