import {
  LOGIN,
  LOGOUT
} from '../actions/auth'

export default function auth (state = null , action) {
  switch(action.type) {
    case LOGIN:
      return action.uid
    case LOGOUT:
      return null
    default:
      return state
  }
}
