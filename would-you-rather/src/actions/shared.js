import { getInitialData } from '../'

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {

    })
  }
}
