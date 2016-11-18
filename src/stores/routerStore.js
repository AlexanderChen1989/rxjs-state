import { Observable } from '@reactivex/rxjs'
import { Actions, dispatch } from '../actions'
import getPayload from '../dispatcher'
import combineLatestObj from '../utils/combineLatestObj'

/* ========================== helpers ========================================= */

const extractRouteAsURL = (route) => {
  return route.path + (route.search || '')
}

/* ========================== state ========================================= */
const route =
  getPayload(Actions.ROUTE_CHANGED)
    .map(extractRouteAsURL)
    .startWith('')

export default combineLatestObj({route})
