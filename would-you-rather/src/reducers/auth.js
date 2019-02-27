import {
  LOGIN,
  LOGOUT
} from ''

export default function auth (state = [], action) {
  switch(action.type) {
    case LOGIN:
      return action.user_id
    case LOGOUT:
      return null
    default:
      return state
  }
}
