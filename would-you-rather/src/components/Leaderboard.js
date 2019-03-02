import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render () {
    return (
        <div>
          Leader Board here
        </div>
    )
  }
}

export default connect()(LeaderBoard)
