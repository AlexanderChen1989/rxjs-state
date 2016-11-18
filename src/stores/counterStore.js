import {Observable} from '@reactivex/rxjs'
import getPayload from '../dispatcher'
import {Actions, dispatch} from '../actions'
import {add} from 'ramda'
import combineLatestObj from '../utils/combineLatestObj'

/* ========================== state ========================================= */

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

/* ========================== handlers ====================================== */

export const increaseCount =
  Observable.of((num) => {
    dispatch(Actions.COUNTER_INCREASED, num)
  })

export const decreaseCount =
  Observable.of((num) => {
    dispatch(Actions.COUNTER_DECREASED, num)
  })

/* ======================== all together ==================================== */

export default
Observable
  .combineLatestObj({count, increaseCount, decreaseCount})