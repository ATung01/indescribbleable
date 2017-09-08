import React from 'react'
import {Button, Form} from 'semantic-ui-react'

const dataStr = "data:image/png;base64, "

export default class Guesser extends React.Component{

  state = {
    guess: ""
  }


  updateImage = () => {
    return dataStr.concat(this.props.savedImage)
  }

  updateGuess = (event) => {
    this.setState({
      guess: event.target.value
    })
  }

  takeAGuess = () => {

  }


  render(){
    return (
      <div >
        <img src={this.updateImage()} alt=""/>
        <Form >
          <Form.Field >
            <label>Enter your Guess</label>
            <input placeholder='Your Guess' onChange={this.updateGuess} />
          </Form.Field>
          <Button  type='button' onClick={this.takeAGuess}>Submit</Button>
        </Form>
      </div>
    )
  }
}
