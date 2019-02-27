import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  RECEIVE_QUESTIONS
} from ''

export default function questions (state = [], action) {
  switch(action.type) {
    case ADD_QUESTION:
      return {
        ...state,
      [action.question.id]: action.question
    }
    case ANSWER_QUESTION:
      const { question_id, answer, authedUser } = action
      return {
      ...state,
      [question_id]: {
        ...state[question_id],
        [answer]: {
          ...state[question_id][answer],
          votes: state[question_id][answer].votes.concat([authedUser])
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
