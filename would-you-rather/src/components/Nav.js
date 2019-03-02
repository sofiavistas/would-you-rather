import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { logout } from '../actions/auth'

const Nav = props => {
  const { authedUserProfile, location, logout } = props
  const path = location.pathname
  return (
    <div className='home-menu pure-menu pure-menu-horizontal pure-menu-fixed'>
      <ul className='pure-menu-list'>
        <li className='pure-menu-item pure-menu-selected'>
          <Link
            to='/'
            className='pure-menu-link'
          >
            Home
          </Link>
        </li>
        <li className='pure-menu-item'>
          <Link
            to='/add'
            className={`pure-menu-link  ${path === '/add' && 'menu-selected'}`}
          >
            New Question
          </Link>
        </li>
        <li className='pure-menu-item'>
          <Link
            to='/leaderboard'
            className={`pure-menu-link  ${path === '/leaderboard' &&
              'menu-selected'}`}
          >
            Leaderboard
          </Link>
        </li>
        {authedUserProfile === null ? (
          <li className='pure-menu-item'>
            <div className='loader' />
          </li>
        ) : (
          <li className='pure-menu-item'>
            <div className='nav-user'>
              Hello, {authedUserProfile.name}
              <img
                className='avatar-small'
                src={`/images/avatars/${authedUserProfile.avatarURL}`}
                alt={authedUserProfile.name}
              />
              <button className='logout-button' onClick={logout}>
                Logout
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser]
  return { authedUserProfile: user || null }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
