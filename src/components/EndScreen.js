import React from 'react'
import { Card } from 'semantic-ui-react'

const EndScreen = (props) => {

  var showWinners = () => {

    return props.winners.map((winner)=>{return winner.nickname}).join(', ')

  }


return (
  <div className="EndScreen">
    <Card className="EndScreen-Card">
      <Card.Content>
        <Card.Header>
          Congratulations!
        </Card.Header>
        <Card.Description>
          Winners: {showWinners()}
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
)

}

export default EndScreen
