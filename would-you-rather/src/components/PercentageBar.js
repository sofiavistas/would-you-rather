import React from 'react'

const PercentageBar = props => {
  const percentage = props.percentage.toFixed(1) + '%'
  return (
    <div className='percentage-bar'>
      <div className='percentage-bar-progress' style={{ width: percentage }}>
        {percentage}
      </div>
    </div>
  )
}

export default PercentageBar
