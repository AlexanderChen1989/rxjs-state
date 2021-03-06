import {Observable} from '@reactivex/rxjs';
import dispatcher from './dispatcher';

const {dispatch, defineAction, filterAction, filterData} = dispatcher;

export const Actions = defineAction(
  "INCR",
  "DECR",
);

const increase =
  filterData(Actions.INCR)

const decrease =
  filterData(Actions.DECR)
    .map(num => -num)

export const count =
  Observable
    .merge(increase, decrease)
    .scan((acc, item) => acc + item)
    .startWith(0)

export const increaseCount =
  Observable.of((num) => {
    if (typeof num !== 'number') {
      throw new Error("number!")
    }
    dispatch(Actions.INCR, num)
  })

export const decreaseCount =
  Observable.of((num) => {
    if (typeof num !== 'number') {
      throw new Error("number!")
    }
    dispatch(Actions.DECR, num)
  })

