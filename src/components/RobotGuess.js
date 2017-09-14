import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export default class RobotGuess extends React.Component {
  showGuesses = () => {
    // return this.props.guesses.map((guess)=>{

      return (
        <Card className="RobotGuess">
          <Image src='/assets/images/avatar/large/daniel.jpg' />
          <Card.Content>
          <Card.Header>Mr. Robot</Card.Header>
          <Card.Description>Here's a list of stuff I thought that could be: {this.props.guesses.join(', ')}.</Card.Description>
          </Card.Content>
        </Card>
      )

  }

  render(){
    return (
      <div>
        {this.showGuesses()}
      </div>

    )
  }
}
