import React from 'react'
import {Button, Form} from 'semantic-ui-react'

const dataStr = "data:image/png;base64, "

export default class Guesser extends React.Component{




  updateImage = () => {
    return dataStr.concat(this.props.savedImage)
  }



  render(){
    return (
      <div >
        <h1>Current Turn: {this.props.currentTurn.nickname} </h1>
        <img src={this.updateImage()} alt=""/>
        { this.props.correctGuess === "f" &&
        <Form >
          <Form.Field >
            <label>Enter your Guess</label>
            <input placeholder='Your Guess' onChange={this.props.updateGuess} />
          </Form.Field>
          <Button type='button' onClick={this.props.takeAGuess}>Submit</Button>
        </Form> || <h3>You got it right!  </h3>}
      </div>
    )
  }
}
