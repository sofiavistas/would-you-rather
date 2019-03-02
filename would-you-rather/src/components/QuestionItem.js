import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class QuestionItem extends Component {
  render () {
    const { id, summary, author, } = this.props
    return (
      <div className='question-list-item'>
        <h5 className='question-title'>{author.name} asks: </h5>
        <div>
          <img src={author.avatarURL} className='avatar-middle' />
          <div className='question-summary'>
            <h5>Would you rather</h5>
            <span>{summary}</span>
            <Link to={`/question/${id}`} className='question-item-link'>
              View Poll
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users }, { id }) {
  const question = questions[id]
  return {
    id,
    question,
    author: users[question.author],
    summary: `... ${question.firstOption.text.substring(0, 25)} ...`
  }
}

export default withRouter(connect(mapStateToProps)(QuestionItem))
