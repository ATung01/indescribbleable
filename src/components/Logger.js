import React from 'react'
import { Button, Checkbox, Form, Image, Modal, Icon } from 'semantic-ui-react'

export default class Logger extends React.Component {

  state = { modalOpen: false }

  handleOpen = (e) => {
    e.preventDefault()
    this.setState({ modalOpen: true })
  }

  handleClose = () => this.setState({ modalOpen: false })

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.loggedIn();
    }
  }




  render(){
    return (
    <div className="login-form">
    <Image height={100} src="indescribbable_white.svg" />
      <Form className="Logger" onKeyPress={this.handleKeyPress}>
        <Form.Field >
          <label className="white-text">Room Code</label>
          <input placeholder='Enter your Room Code' value={this.props.state.roomCode} onChange={this.props.handleRoom} />
        </Form.Field>
        <Form.Field>
          <label className="white-text" >Nickname</label>
          <input placeholder='Enter a nickname' value={this.props.state.nickname} onChange={this.props.handleNickname}/>
        </Form.Field>
        <Form.Field>
          <Checkbox className="white-text" label={
            <Modal
                trigger={<label><a href='/' onClick={this.handleOpen}>I accept the Terms of Service</a></label>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
              >
                <Modal.Content>
                  <h3>By accepting these Terms, you agree to relinquish custody of your first born child to us.</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Got it
                  </Button>
                </Modal.Actions>
              </Modal>}/>

        </Form.Field>
        <Button  type='button' onClick={this.props.loggedIn} >Submit</Button>
      </Form>


    </div>
    )
  }
}
