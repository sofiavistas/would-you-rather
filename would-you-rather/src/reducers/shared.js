import { combineReducers } from 'redux'
import auth from './auth'
import users from './users'
import questions from './questions'

export default combineReducers ({
  authedUser: auth,
  users,
  questions,
})
