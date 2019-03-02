import React from 'react'
import { connect } from 'react-redux'
import { IoMdTrophy } from 'react-icons/io/index'

const LeaderBoard = props =>
  props.top.length > 0 ? (
    <div className='leader-board'>
      <ul>
        {props.top.map((user, i) => (
          <li key={user.id} className='leader-board-item'>
            <div className='triangle'>
              <span className={`top${i + 1}`}>
                <IoMdTrophy />
              </span>
            </div>
            <div className='item-content'>
              <img
                src={`/images/avatars/${user.avatarURL}`}
                className='avatar-middle'
                alt={user.name}
              />
              <div className='leader-board-info'>
                <h4>{user.name}</h4>
                <span className='score-type'>Questions Answered </span>
                <span className='score-count'>{user.answered}</span>
                <hr />
                <span className='score-type'>Questions Submitted</span>
                <span className='score-count'>{user.submitted}</span>
              </div>
              <div className='score-box'>
                <h5 className='title'>Score</h5>
                <span className='score'>{user.score}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Not Available</div>
  )

function mapStateToProps ({ users }) {
  const scoredUsers = Object.values(users).map(user => {
    const answered = user.questions.length
    const submitted = Object.keys(user.answers).length
    return {
      ...user,
      answered,
      submitted,
      score: answered + submitted
    }
  })

  const topIDs = Object.keys(scoredUsers)
    .sort((a, b) => scoredUsers[b].score - scoredUsers[a].score)
    .slice(0, 3)
  return {
    top: topIDs.map(uid => scoredUsers[uid])
  }
}

export default connect(mapStateToProps)(LeaderBoard)
