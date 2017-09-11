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
        <img src={this.updateImage()} alt=""/>
        <Form >
          <Form.Field >
            <label>Enter your Guess</label>
            <input placeholder='Your Guess' onChange={this.props.updateGuess} />
          </Form.Field>
          <Button  type='button' onClick={this.props.takeAGuess}>Submit</Button>
        </Form>
      </div>
    )
  }
}
