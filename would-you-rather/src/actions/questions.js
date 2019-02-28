import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { userAnswerQuestion, userAddQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function answerQuestion({ question_id, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    question_id,
    authedUser,
    answer
  }
}

export function handleAnswerQuestion({ question_id, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestionAnswer({ authedUser, question_id, answer }).then(() => {
        dispatch(answerQuestion({ question_id, authedUser, answer }))
        dispatch(userAnswerQuestion({ question_id, authedUser, answer }))
    })
  }
}

export function handleAddQuestion ({ firstOption, secondOption }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const question = { firstOption, secondOption, author: authedUser }
    return saveQuestion(question).then(savedQuestion => {
      dispatch(addQuestion(savedQuestion))
      dispatch(userAddQuestion(savedQuestion))
    })
  }
}
