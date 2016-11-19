import keyMirror from 'key-mirror'
import { DONT_USE_UNLESS_YOUR_NAME_IS_ACTION_CREATOR } from './dispatcher'

export const Actions = keyMirror({
  ROUTE_CHANGED: null, // {path: string, query: string}
  COUNTER_INCREASED: null,
  COUNTER_DECREASED: null,
})



export function dispatch (type, payload = null) {
  if (!Actions.hasOwnProperty(type)) {
    throw new Error(`Tried to dispatch an unknown action. 
                     Action type: ${type}. 
                     Please make sure actions you use are in the
                     list of known actions.`)
  }

  const action = { type, payload }

  DONT_USE_UNLESS_YOUR_NAME_IS_ACTION_CREATOR.next(action)
}


