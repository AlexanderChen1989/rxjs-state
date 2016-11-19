import React from 'react'
import {render} from 'react-dom'
import { Observable } from '@reactivex/rxjs'

import match, {changeRoute} from './utils/routing'
import services from './services'
import stores from './stores'
import {counterStore, routerStore} from './stores'


class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {count: 1}
  }

  incr() {
    this.setState({count: this.state.count + 1})
  }

  render() {
    const {count} = this.state
    const {name} = this.props
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => this.incr()}>Add</button>
      </div>
    )
  }
}


class App extends React.Component {
  static childContextTypes = {
    route: React.PropTypes.string
  }

  getChildContext() {
    return {route: this.props.routerStore.route};
  }

  render() {
    const {counterStore: {count, increaseCount, decreaseCount}} = this.props
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() =>increaseCount(10)}>+</button>
        <button onClick={() =>decreaseCount(10)}>-</button>
        <br/>
        <button onClick={() => changeRoute('/about') }>About</button>
        <button onClick={() => changeRoute('/ok') }>Ok</button>
        <br />

        { match('/about', <h1>About</h1>) }
        { match('/ok', <h1>Ok</h1>) }
      </div>
    )
  }
}

App.contextTypes = {
  route: React.PropTypes.string
};

services.subscribe(() => {})

stores.subscribe(state => {
  render(
    <App {...state} />,
    document.getElementById('app')
  )
})

Observable
  .combineLatest(counterStore, routerStore, (c, r) => {
    return Object.assign({}, c, r)
  })
  .subscribe((state) => console.log(state))


