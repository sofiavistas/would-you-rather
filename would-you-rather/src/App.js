import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Login from './Login'
import Home from './Home'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render () {
    return (
      <Router>
        <div>
          <LoadingBar style={{ zIndex: '4', backgroundColor: 'grey' }} />
          <div className='body'>
            {this.props.loading === true ? null : (
              <div>
                <Nav />
                <div className='container'>
                  <Route path='/' exact component={Home} />
                  <Route path='/question/:id' exact component={QuestionPage} />
                  <Route path='/new' exact component={NewQuestion} />
                  <Route path='/leader-board' exact component={LeaderBoard} />
                  <Route path='/login' exact component={Login} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
