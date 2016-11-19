import {Observable} from '@reactivex/rxjs'
import getPayload from './dispatcher'
import {actions, dispatch} from './actions'
import {add} from 'ramda'
import combineLatestObj from './utils/combineLatestObj'


/* ========================== helpers ========================================= */

const extractRouteAsURL = (route) => {
  return route.path + (route.search || '')
}

/* ========================== state ========================================= */
const route =
  getPayload(actions.ROUTE_CHANGED)
    .map(extractRouteAsURL)
    .startWith('')



/* ========================== state ========================================= */

const increase =
  getPayload(actions.COUNTER_INCREASED)

const decrease =
  getPayload(actions.COUNTER_DECREASED)
    .map(num => -num)

export const count =
  Observable
    .merge(increase, decrease)
    .scan(add)
    .startWith(0)

/* ========================== handlers ====================================== */

export const increaseCount =
  Observable.of((num) => {
    dispatch(actions.COUNTER_INCREASED, num)
  })

export const decreaseCount =
  Observable.of((num) => {
    dispatch(actions.COUNTER_DECREASED, num)
  })

/* ======================== all together ==================================== */

export const counterStore = combineLatestObj({count, increaseCount, decreaseCount})
export const routerStore=  combineLatestObj({route})
export default combineLatestObj({counterStore, routerStore})
