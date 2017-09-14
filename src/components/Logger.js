import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default class Logger extends React.Component {







  render(){
    return (
    <div className="login-form">
      <Form className="Logger">
        <Form.Field >
          <label>Room Code</label>
          <input placeholder='Enter your Room Code' value={this.props.state.roomCode} onChange={this.props.handleRoom} />
        </Form.Field>
        <Form.Field>
          <label>Nickname</label>
          <input placeholder='Enter a nickname' value={this.props.state.nickname} onChange={this.props.handleNickname}/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button  type='button' onClick={this.props.loggedIn}>Submit</Button>
      </Form>
    </div>
    )
  }
}
