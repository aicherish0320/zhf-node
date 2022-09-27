// ! 观察者模式

// 被观察者，需要将观察者收集起来
class Subject {
  constructor(name) {
    this.name = name
    this.state = 'happy'

    this.observers = []
  }
  attach(o) {
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState
    this.observers.forEach((o) => o.update(this.name, this.state))
  }
}
// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(name, state) {
    console.log('name >>> ', this.name, name, state)
  }
}

const s = new Subject('baby')
const o1 = new Observer('mon')
const o2 = new Observer('dad')

s.attach(o1)
s.attach(o2)

s.setState('unhappy')
