import React from 'react'

const EndScreen = (props) => {

  var showWinners = () => {

    return props.winners.map((winner)=>{return winner.nickname}).join(', ')

  }


return (
  <div className="EndScreen">
    <h1>Congratulations to the Winners!</h1>
    <h1>{showWinners()}</h1>
  </div>
)

}

export default EndScreen
