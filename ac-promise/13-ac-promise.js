const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('rejected')

function handlePromiseResult(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  if (x instanceof Promise) {
    if (x.promiseStatus === fulfilled) {
      return resolve(x.promiseValue)
    } else if (x.promiseStatus === rejected) {
      return reject(x.promiseValue)
    } else {
      return x.then((result) => {
        handlePromiseResult(result, promise2, resolve, reject)
      }, reject)
    }
  }

  resolve(x)
}

class Promise {
  constructor(executor) {
    this.promiseValue = null
    this.promiseStatus = pending

    this._initBind()
    this._initCollection()
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
  _initCollection() {
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
  }
  _changePromiseStatus(statusType, value) {
    this.promiseStatus = statusType
    this.promiseValue = value
  }
  _triggerExecuteCollection(arr) {
    while (arr.length) {
      arr.shift()(this.promiseValue)
    }
  }
  resolve(value) {
    if (this.promiseStatus !== pending) return
    this._changePromiseStatus(fulfilled, value)
    this._triggerExecuteCollection(this.fulfilledCallbacks)
  }
  reject(reason) {
    if (this.promiseStatus !== pending) return
    this._changePromiseStatus(rejected, reason)
    this._triggerExecuteCollection(this.rejectedCallbacks)
  }
  then(onFulFilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.promiseStatus === fulfilled) {
        setTimeout(() => {
          try {
            const x = onFulFilled(this.promiseValue)
            handlePromiseResult(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.promiseStatus === rejected) {
        setTimeout(() => {
          try {
            const x = onRejected(this.promiseValue)
            handlePromiseResult(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        this.fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulFilled(this.promiseValue)
              handlePromiseResult(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.promiseValue)
              handlePromiseResult(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  static resolve(value) {
    return new Promise((resolve) => resolve(value))
  }
  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason))
  }
  static all(promises) {}
}

const p1 = new Promise((resolve, reject) => {
  resolve(1)
})

Promise.reject(1).then(
  (data) => {
    console.log(data)
  },
  (error) => {
    console.log('error >>> ', error)
  }
)
