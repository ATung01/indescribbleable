import React from 'react'
import {Button, Form} from 'semantic-ui-react'

const dataStr = "data:image/png;base64, "

export default class Guesser extends React.Component{




  updateImage = () => {
    return dataStr.concat(this.props.savedImage)
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.takeAGuess();
    }
  }


  render(){
    return (
      <div className="imgBg-container" onKeyPress={this.handleKeyPress}>
        <h1>Current Turn: {this.props.currentTurn.nickname} </h1>
        <img className="imgBg"src={this.updateImage()} alt=""/>
        { this.props.correctGuess === "f" &&
        <Form >
          <Form.Field >
            <label>Enter your Guess</label>
            <input placeholder='Your Guess' onChange={this.props.updateGuess} />
          </Form.Field>
          <Button type='button' onClick={this.props.takeAGuess}>Submit</Button>
        </Form>}
          {this.props.correctGuess === "t" && <h3 className="Right">You got it right!  </h3>}
      </div>
    )
  }
}
