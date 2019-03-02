import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BeatLoader } from 'react-spinners'

class Nav extends Component {
  render () {
    const { authedUserProfile } = this.props
    return (
      <div className='home-menu pure-menu pure-menu-horizontal pure-menu-fixed'>
        <ul className='pure-menu-list'>
          <li className='pure-menu-item pure-menu-selected'>
            <a href='#' className='pure-menu-link'>
              Home
            </a>
          </li>
          <li className='pure-menu-item'>
            <a href='#' className='pure-menu-link'>
              New Question
            </a>
          </li>
          <li className='pure-menu-item'>
            <a href='#' className='pure-menu-link'>
              Leader Board
            </a>
          </li>
          <li className='pure-menu-item'>
            <div className='nav-user'>
              {authedUserProfile === undefined ? (
                <div className='sweet-loading'>
                  <BeatLoader color={'#2fbea4'} loading={true} size={16} />
                </div>
              ) : (
                <div>
                  Hello, {authedUserProfile.name}
                  <img
                    className='authed-user-avatar'
                    src={authedUserProfile.avatarURL}
                  />
                </div>
              )}
            </div>
          </li>
          <li className='pure-menu-item'>
            <a className='pure-menu-link' href='#'>
              Logout
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return { authedUserProfile: users[authedUser] }
}

export default connect(mapStateToProps)(Nav)
