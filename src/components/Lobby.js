import React from 'react'
import CanvasElements from './CanvasElements'
import { Button} from 'semantic-ui-react';
import PlayerList from './PlayerList'
import Guesser from './Guesser'


export default class Lobby extends React.Component {

  state = {
    started: false,
    users: [],
    currentUser: "not you",
    savedImage: ""
  }

  componentDidMount(){
    this.checkGameStatus()
  }

  startGame = () => {
    this.setState({
      roomCode: this.props.match.roomCode,
      users: this.props.match.users,
      currentUser: this.props.match.current_user,
      started: true
    })

    let myInit = {
      method: "PATCH",
      body: JSON.stringify({started: true}),
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(`http://localhost:3000/matches/${this.props.match.current_user.match_id}`, myInit )
    .then(resp => resp.json())
    .then(result => console.log(result))

  }

  addToStore = (image) => {
    let myInit = {
      method: "post",
      body: JSON.stringify({image: image.src, room_code: this.state.roomCode}),
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch("http://localhost:3000/sketches", myInit )
    .then(resp => resp.json())
    .then(result => this.setState({
      savedImage: result.data
    }))
  }

  checkGameStatus = () => {
    fetch(`http://localhost:3000/matches/${this.props.match.current_user.match_id}`)
    .then(resp => resp.json())
    .then(result => this.setState({
      started: result.started,
      savedImage: result.sketch.data,
      users: result.users
    }, ()=> console.log(this.state.started)))
    setTimeout(this.checkGameStatus, 5000)

  }


  render(){

    return (
      <div>
      {this.state.started === "t" && this.state.currentUser !== "not you" && <CanvasElements addToStore={this.addToStore}/>}
      {this.state.started === "t" && this.state.currentUser === "not you" && <Guesser savedImage={this.state.savedImage}/>}
      {this.state.started === "f" && <Button className="GameStarter" onClick={this.startGame}>Press this to start</Button>}
      {this.state.users.length !== 0 && < PlayerList players={this.state.users}/>}
      </div>
    )
  }
}
