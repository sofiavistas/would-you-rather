import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Login from './Login'
import Home from './Home'
import QuestionPage from './QuestionsPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { authedUser } = this.props
    return (
      <Router>
        <div>
          <LoadingBar style={{ zIndex: '4', backgroundColor: 'grey' }} />
          <Switch>
            <Route path='/login' exact component={Login} />
            <PrivateRoute
              path='/'
              exact
              authedUser={authedUser}
              component={Wrapper(Home)}
            />
            <PrivateRoute
              path='/questions/:qid'
              exact
              authedUser={authedUser}
              component={Wrapper(QuestionPage)}
            />
            <PrivateRoute
              path='/add'
              exact
              authedUser={authedUser}
              component={Wrapper(NewQuestion)}
            />
            <PrivateRoute
              path='/leaderboard'
              exact
              authedUser={authedUser}
              component={Wrapper(Leaderboard)}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, authedUser, ...args }) => {
  return (
    <Route
      {...args}
      render={props =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const Wrapper = Component => {
  return props => (
    <div className='body'>
      <Nav />
      <div className='container'>
        <Component {...props} />
      </div>
      <div className='footer'>
        <p>
          designed by{' '}
          <a href='https://www.flaticon.com/authors/freepik'>Freepik</a> from{' '}
          <a href='https://www.flaticon.com/'>Flaticon</a>
        </p>
      </div>
    </div>
  )
}

const NoMatch = ({ location }) => (
  <div>
    <h2>404</h2>
    <h3>
      No match for <code>{location.pathname}</code>,
      Go back to the <Link to='/'>Homepage</Link>.
    </h3>
  </div>
)

const mapStateToProps = ({ authedUser }) => ({ authedUser })
export default connect(mapStateToProps)(App)
