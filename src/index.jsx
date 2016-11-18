import React from 'react'
import {render} from 'react-dom'
import match, {changeRoute} from './utils/routing'
import services from './services'
import stores from './stores'


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
    console.log(`Hello, ${name}!`)
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
    return {route: this.props.route};
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Hello name="Hello1"/>
        <Hello name="Hello2"/>
        <button onClick={() => changeRoute('/about') }>
          About
        </button>
        { match('/about', <h1>About</h1>) }
      </div>
    )
  }
}

App.contextTypes = {
  route: React.PropTypes.string
};

services.subscribe(() => {
})
stores.subscribe(state => {
  render(
    <App {...state} />,
    document.getElementById('app')
  )
})


