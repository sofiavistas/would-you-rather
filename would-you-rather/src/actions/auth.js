
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function login(user_id) {
  return {
    type: LOGIN,
    user_id
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
