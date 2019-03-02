import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    loading: false,
    firstOption: '',
    secondOption: '',
    toHome: false
  }

  inputOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitAvailable = () => {
    return (
      this.state.firstOption.trim() === '' ||
      this.state.secondOption.trim() === '' ||
      this.state.loading === true
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { firstOption, secondOption } = this.state
    const { onSubmit } = this.props

    onSubmit(firstOption, secondOption)
      .then(() => this.setState({ toHome: true }))
      .catch(() => {
        console.warn('Error in handleAddQuestion: ', e)
        alert('Error submitting the question. Please try again.')
        this.setState({ loading: false })
      })
  }

  render () {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className='content new-question'>
        <h3 className='title'>Submit New Question</h3>
        <p>Complete the question:</p>
        <h5>Would you rather ...</h5>
        <form onSubmit={this.handleSubmit} className='pure-form pure-form-stacked'>
          <div className='new-question-form'>
            <input
              type='text'
              name='firstOption'
              maxLength={55}
              placeholder='Enter First Option'
              value={this.state.firstOption}
              onChange={this.inputOnChange}
            />
            <h3>OR</h3>
            <input
              type='text'
              name='secondOption'
              maxLength={55}
              placeholder='Enter Second Option'
              value={this.state.secondOption}
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
    onSubmit: (firstOption, secondOption) => {
      return dispatch(handleAddQuestion({ firstOption, secondOption }))
    }
  }
}
export default connect(null, mapDispatchToProps)(NewQuestion)
