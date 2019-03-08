
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function login(uid) {
  return {
    type: LOGIN,
    uid
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
