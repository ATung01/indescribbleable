import React from 'react'
import ReactCountdownClock from 'react-countdown-clock'



import { Card} from 'semantic-ui-react'

const Answer = (props) => {


  return(
    <div className="AnswerCard">
    <Card className="AnswerCard-box">
      <Card.Content>
        <Card.Header>It's your turn. Draw the below. </Card.Header>
        <Card.Description>{props.answer}</Card.Description>
      </Card.Content>
    </Card>
    <ReactCountdownClock seconds={45}
    color="#ffffff"
    size={80}
    onComplete={props.endTurn} />
    </div>

  )
}

export default Answer
