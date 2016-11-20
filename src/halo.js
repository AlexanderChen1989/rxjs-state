import {Observable, Subject} from '@reactivex/rxjs'

export function combineLatestObj(obj) {
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

export class Dispatcher {
  constructor() {
    this._dispatcher = new Subject()
    this._actionsStream = this._dispatcher.asObservable().publishReplay(1).refCount()
    this._actions = {}

    this.dispatch = this.dispatch.bind(this)
    this.actions = this.actions.bind(this)
    this.filterAction = this.filterAction.bind(this)
    this.filterData = this.filterData.bind(this)
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

  actions(obj) {
    var key
    var actions = {}

    if (obj && typeof obj === 'object') {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          actions[key] = key;
        }
      }
    }

    this._actions = Object.assign({}, this._actions, actions)
    return this._actions;
  }


  filterAction(...actions) {
    // filter all actions
    if (actions.length === 0) {
      return this._actionsStream
    }

    // filter action based on function user provided
    if (typeof actions[0] === 'function') {
      return this._actionsStream.filter(actions[0])
    }

    // filter actions based on actions user provided
    for (var i = 0; i < actions.length; i++) {
      if (!(this._actions.hasOwnProperty(actions[i]))) {
        throw new Error('Invalid filters provided to dispatcher func')
      }
    }

    this._actionsStream.filter((message) => {
      return actions.indexOf(message.type) !== -1
    })
  }

  filterData(...args) {
    return this.filterAction(...args).pluck('data')
  }
}


