import React, { Component } from 'react'
import { connect } from 'react-redux'

import QuestionItem from './QuestionItem'

class Home extends Component {
  state = {
    question: 'not_answered'
  }

  handleTab = e => {
    this.setState({ question: e.target.name })
  }

  render () {
    const { question } = this.state

    let not_answered_class = 'tab-button pure-button'
    let answered_class = 'tab-button pure-button'
    
    question === 'not_answered'
      ? (not_answered_class += ' pure-button-active')
      : (answered_class += ' pure-button-active')

    return (
      <div className='content'>
        <div className='pure-button-group' role='toolbar' aria-label='...'>
        <button
          name='answered'
          className={answered_class}
          onClick={this.handleTab}
        >
          Answered Questions
        </button>
          <button
            name='not_answered'
            className={not_answered_class}
            onClick={this.handleTab}
          >
            Not Answered Questions
          </button>
        </div>
        <ul className='question-list'>
          {this.props[this.state.question].map(q => (
            <li key={q}>
              <QuestionItem qid={q} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  if (users[authedUser]) {
    const sortedQuestions = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
    const answers = users[authedUser].answers
    return {
      not_answered: sortedQuestions.filter(
        q => !Object.keys(answers).includes(q)
      ),
      answered: sortedQuestions.filter(q => Object.keys(answers).includes(q))
    }
  } else {
    return {
      not_answered: [],
      answered: []
    }
  }
}

export default connect(mapStateToProps)(Home)
