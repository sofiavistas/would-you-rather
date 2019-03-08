import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  RECEIVE_QUESTIONS
} from '../actions/questions'

export default function questions (state = null, action) {
  switch(action.type) {
    case ADD_QUESTION:
      return {
        ...state,
      [action.question.id]: action.question
    }
    case ANSWER_QUESTION:
      const { qid, answer, authedUser } = action
      return {
      ...state,
      [qid]: {
        ...state[qid],
        [answer]: {
          ...state[qid][answer],
          votes: state[qid][answer].votes.concat([authedUser])
        }
      }
    }
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions

      }
    default:
      return state
  }

}
