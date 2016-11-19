import {Observable} from '@reactivex/rxjs'
import getPayload from './dispatcher'
import {Actions, dispatch} from './actions'
import {add} from 'ramda'
import combineLatestObj from './utils/combineLatestObj'

const extractRouteAsURL = (route) => {
  return route.path + (route.search || '')
}

const route =
  getPayload(Actions.ROUTE_CHANGED)
    .map(extractRouteAsURL)
    .startWith('')

const increase =
  getPayload(Actions.COUNTER_INCREASED)

const decrease =
  getPayload(Actions.COUNTER_DECREASED)
    .map(num => -num)

export const count =
  Observable
    .merge(increase, decrease)
    .scan(add)
    .startWith(0)

export const increaseCount =
  Observable.of((num) => {
    dispatch(Actions.COUNTER_INCREASED, num)
  })

export const decreaseCount =
  Observable.of((num) => {
    dispatch(Actions.COUNTER_DECREASED, num)
  })

export const counterStore = combineLatestObj({count, increaseCount, decreaseCount})
export const routerStore=  combineLatestObj({route})
export default combineLatestObj({counterStore, routerStore})
