import {Observable} from '@reactivex/rxjs'

export default function combineLatestObj(obsObj) {
  let observables = []
  const keys = Object.keys(obsObj)

  keys.map((key) => {
    observables.push(obsObj[key])
  })

  return Observable.combineLatest(observables, (...args) => {
    return args.reduce((output, current, i) => {
      return Object.assign(output, {[keys[i]]: current})
    }, {})
  })
}

