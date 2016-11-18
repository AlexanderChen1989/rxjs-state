import React from 'react'
import {render} from 'react-dom'
import match, { changeRoute } from './utils/routing'
import services from './services'
import stores from './stores'




class App extends React.Component {
  static childContextTypes = {
    route: React.PropTypes.string
  }

  getChildContext() {
    return {route: this.props.route};
  }

  render() {
    console.log(this.props.route)
    return (
      <div>
        <h1>Hello</h1>
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

services.subscribe(() => {})
stores.subscribe(state => {
  render(
    <App {...state} />,
    document.getElementById('app')
  )
})


