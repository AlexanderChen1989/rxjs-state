import React from 'react'
import {Observable, Subject} from '@reactivex/rxjs'

export const combine = (obj) => {
  let observables = []
  const keys = Object.keys(obj)

  keys.forEach((key) => {
    observables.push(obj[key])
  })

  return Observable.combineLatest(observables, (...args) => {
    return args.reduce((output, current, i) => {
      return Object.assign(output, {[keys[i]]: current})
    }, {})
  })
}

export const subscribe = (store) => (WrappedComponent) => {
  store = combine(store)
  return class InnerComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = null
    }

    componentDidMount() {
      this.subscribe = store.subscribe(
        this.onNext.bind(this),
        this.onComplete.bind(this),
        this.onError.bind(this),
      )
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

    onComplete() {
      console.log("completed")
    }

    onError(err) {
      console.log(err)
    }

    render() {
      if (this.state) {
        return <WrappedComponent {...this.state} />
      }
      return null
    }
  }
}

export class Dispatcher {
  constructor() {
    this._dispatcher = new Subject()
    this._actionsStream = this._dispatcher.asObservable().publishReplay(1).refCount()
    this._actions = {}

    this.dispatch = this.dispatch.bind(this)
    this.defineAction = this.defineAction.bind(this)
    this.filterAction = this.filterAction.bind(this)
    this.filterData = this.filterData.bind(this)
  }

  get actionStream() {
    return this._actionsStream
  }

  dispatch(type, data = null) {
    if (!this._actions.hasOwnProperty(type)) {
      throw new Error(`Tried to dispatch an unknown action.
                     Action type: ${type}.
                     Please make sure actions you use are in the
                     list of known actions.`)
    }

    this._dispatcher.next({type, data})
  }

  defineAction(...actions) {
    actions = actions.reduce((acc, a) => {
      acc[a] = a;
      return acc
    }, {});

    this._actions = Object.assign({}, this._actions, actions)
    return this._actions;
  }


  filterAction(...actions) {
    // filter all defineAction
    if (actions.length === 0) {
      return this._actionsStream
    }

    // filter action based on function user provided
    if (typeof actions[0] === 'function') {
      return this._actionsStream.filter(actions[0])
    }

    // filter defineAction based on defineAction user provided
    for (var i = 0; i < actions.length; i++) {
      if (!(this._actions.hasOwnProperty(actions[i]))) {
        throw new Error('Invalid filters provided to dispatcher func')
      }
    }

    return this._actionsStream.filter((message) => {
      return actions.indexOf(message.type) !== -1
    })
  }

  filterData(...args) {
    return this.filterAction(...args).pluck('data')
  }
}


