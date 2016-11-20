import React from 'react'
import {render} from 'react-dom'
import {Observable} from '@reactivex/rxjs'

import services from './services'
import combineLatestObj from './utils/combineLatestObj'
import {count, increaseCount, decreaseCount} from './stores'


const observer = (store) => (WrappedComponent) => {
  return class InnerComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = null
    }

    componentDidMount() {
      this.subscribe = store.subscribe(this.onNext.bind(this))
    }

    componentWillUnmount() {
      if (this.subscribe) {
        this.subscribe.unsubscribe()
      }
    }

    onNext(state) {
      if (!this.state || this.state !== state) {
        this.setState(state)
      }
    }

    render() {
      if (this.state) {
        return <WrappedComponent {...this.state} />
      }
      return null
    }
  }
}

@observer(combineLatestObj({count, increaseCount, decreaseCount}))
class Counter extends React.Component {
  render() {
    const {count, increaseCount, decreaseCount} = this.props
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => increaseCount(10)}>+</button>
        <button onClick={() => decreaseCount(10)}>-</button>
      </div>
    )
  }
}


services.subscribe(() => {
})


render(
  <div>
    <Counter />
    <h1>Hello</h1>
  </div>,
  document.getElementById('app')
)
