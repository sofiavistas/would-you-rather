import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import PercentageBar from './PercentageBar'

class QuestionPage extends Component {
  handleSubmit = (e, answer) => {
    const { dispatch, question } = this.props
    dispatch(
      handleAnswerQuestion({
        question_id: question.id,
        answer: answer
      })
    )
  }

  render () {
    const { question } = this.props
    if (question === null) {
      return <p>Question Not Found.</p>
    }
    const { author, firstOption, secondOption, answered } = question
    return (
      <div className='content'>
        <h5 className='question-title'>{author.name} asks: </h5>
        <div className='question-box'>
          <div className='question-box-avatar'>
            <img src={author.avatarURL} className='avatar-big' />
          </div>
          {answered === null ? (
            <NotAnsweredQuestion
              answered={answered}
              firstOption={firstOption.text}
              secondOption={secondOption.text}
              handleSubmit={this.handleSubmit}
            />
          ) : (
            <AnsweredQuestion
              answered={answered}
              firstOption={firstOption}
              secondOption={secondOption}
            />
          )}
        </div>
      </div>
    )
  }
}

class NotAnsweredQuestion extends Component {
  state = {
    answer: 'firstOption'
  }

  handleRadioChange = e => {
    const answer = e.target.value
    this.setState(currentState => ({
      ...currentState,
      answer
    }))
  }

  render () {
    const answer = this.state.answer
    const { firstOption, secondOption, handleSubmit } = this.props
    return (
      <div className='question-summary'>
        <h3>Would you rather ...</h3>
        <label htmlFor='firstOption' className='pure-radio'>
          <input
            id='firstOption'
            type='radio'
            name='options'
            value='firstOption'
            checked={answer === 'firstOption'}
            onChange={this.handleRadioChange}
          />
          {firstOption}
        </label>

        <label htmlFor='secondOption' className='pure-radio'>
          <input
            id='secondOption'
            type='radio'
            name='options'
            value='secondOption'
            checked={answer === 'secondOption'}
            onChange={this.handleRadioChange}
          />
          {secondOption}
        </label>
        <button
          className='pure-button submit-button'
          onClick={e => handleSubmit(e, answer)}
        >
          Submit
        </button>
      </div>
    )
  }
}

const AnsweredQuestion = ({ answered, firstOption, secondOption }) => {
  const votes = firstOption.votes.concat(secondOption.votes).length

  const result = (
    <div className='question-summary'>
      <h3>Results:</h3>
      <div
        className={`question-result ${answered === 'optionOne' &&
          'question-result-voted'}`}
      >
        <span>{firstOption.text}</span>
        <PercentageBar percentage={5} />
        {firstOption.votes.length} out of {votes} votes
      </div>
      <div
        className={`question-result ${answered === 'secondOption' &&
          'question-result-voted'}`}
      >
        <span>{secondOption.text}</span>
        <PercentageBar percentage={60} />
        {secondOption.votes.length} out of {votes} votes
      </div>
    </div>
  )
  return result
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? {
        ...question,
        author: users[question.author],
        answered: Object.keys(users[authedUser].answers).includes(id)
          ? users[question.author].answers[id]
          : null
      }
      : null
  }
}

export default connect(mapStateToProps)(QuestionPage)
