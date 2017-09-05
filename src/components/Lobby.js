import React from 'react'
import CanvasElements from './CanvasElements'
import { Button} from 'semantic-ui-react';
import PlayerList from './PlayerList'


export default class Lobby extends React.Component {

  state = {
    started: false,
    users: []
  }

  startGame = () => {
    console.log(this.props)
    this.setState({
      roomCode: this.props.match.roomCode,
      users: this.props.match.users,
      currentUser: this.props.match.current_user,
      started: true
    }, console.log(this.state))
  }


  render(){

    return (
      <div>
      {this.state.started && <CanvasElements/>}
      {this.state.started === false && <Button className="GameStarter" onClick={this.startGame}>Press this to start</Button>}
      {this.state.users.length !== 0 && < PlayerList players={this.state.users}/>}
      </div>
    )
  }
}
