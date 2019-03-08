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

function answerQuestion({ qid, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleAnswerQuestion({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
        dispatch(answerQuestion({ qid, authedUser, answer }))
        dispatch(userAnswerQuestion({ qid, authedUser, answer }))
    })
  }
}

export function handleAddQuestion ({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const question = { optionOneText, optionTwoText, author: authedUser }
    return saveQuestion(question).then(savedQuestion => {
      dispatch(addQuestion(savedQuestion))
      dispatch(userAddQuestion(savedQuestion))
    })
  }
}
