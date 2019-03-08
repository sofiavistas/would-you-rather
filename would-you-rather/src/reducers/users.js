import {
  USER_ANSWER_QUESTION,
  RECEIVE_USERS,
  USER_ADD_QUESTION
} from '../actions/users'

export default function users (state = null, action) {
  switch (action.type) {
    case USER_ANSWER_QUESTION:
      const { qid, authedUser, answer } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
             ...state[authedUser].answers,
              [qid]: answer
            }
        }
      }
     case RECEIVE_USERS: {
       return {
         ...state,
         ...action.users
       }
     }
     case USER_ADD_QUESTION:
      const { id, author } = action.question
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      }

    default:
      return state

  }
}
