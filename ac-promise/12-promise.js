const Promise = require('./08-ac-promise/05-promise')

const p1 = new Promise((resolve) => resolve(1))
const p2 = new Promise((resolve, reject) => reject(2))
const p3 = new Promise((resolve) => resolve(3))

Promise.all([p1, 4, p2, 7, p3])
  .then((data) => {
    console.log('data >>> ', data)
  })
  .catch((error) => {
    console.log('error >>> ', error)
  })
