import React from 'react'


import { Card} from 'semantic-ui-react'

const Answer = (props) => {


  return(
    <Card className="AnswerCard">
      <Card.Content>
        <Card.Header>Draw a </Card.Header>
        <Card.Description>{props.answer}</Card.Description>
      </Card.Content>
    </Card>

  )
}

export default Answer
