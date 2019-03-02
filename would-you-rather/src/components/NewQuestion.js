import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    loading: false,
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  inputOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitAvailable = () => {
    return (
      this.state.optionOneText.trim() === '' ||
      this.state.optionTwoText.trim() === '' ||
      this.state.loading === true
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { optionOneText, optionTwoText } = this.state
    const { onSubmit } = this.props

    onSubmit(optionOneText, optionTwoText)
      .then(() => this.setState({ toHome: true }))
      .catch(() => {
        console.warn('Error in handleAddQuestion: ', e)
        alert('There was an error creating the question. Please try again.')
        this.setState({ loading: false })
      })
  }

  render () {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className='content new-question'>
        <h3 className='title'>Create New Question</h3>
        <p>Complete the question:</p>
        <h5>Would you rather ...</h5>
        <form onSubmit={this.handleSubmit} className='pure-form pure-form-stacked'>
          <div className='new-question-form'>
            <input
              type='text'
              name='optionOneText'
              maxLength={55}
              placeholder='Enter Option One Text Here'
              value={this.state.optionOneText}
              onChange={this.inputOnChange}
            />
            <h3>OR</h3>
            <input
              type='text'
              name='optionTwoText'
              maxLength={55}
              placeholder='Enter Option Two Text Here'
              value={this.state.optionTwoText}
              onChange={this.inputOnChange}
            />
            <button
              type='submit'
              disabled={this.submitAvailable()}
              className='pure-button submit-button'
            >
              {this.state.loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (optionOneText, optionTwoText) => {
      return dispatch(handleAddQuestion({ optionOneText, optionTwoText }))
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(NewQuestion)
