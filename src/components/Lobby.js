import React from 'react'
import CanvasElements from './CanvasElements'
import { Button} from 'semantic-ui-react';
import PlayerList from './PlayerList'
import Guesser from './Guesser'





export default class Lobby extends React.Component {

  state = {
    started: "f",
    users: [],
    currentUser: {id:0},
    currentTurn: {id:0},
    savedImage: ""
  }

  componentDidMount(){
    this.setState({
      currentUser: this.props.match.current_user
    })

    this.checkGameStatus()
  }

  startGame = () => {
    this.setState({
      roomCode: this.props.match.roomCode,
      users: this.props.match.users,
      currentTurn: this.props.match.current_user,
      started: true
    })

    let myInit = {
      method: "PATCH",
      body: JSON.stringify({started: true, currentUserID: this.props.match.current_user.id}),
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch(`http://localhost:3000/matches/${this.props.match.current_user.match_id}`, myInit )
    .then(resp => resp.json())
    .then(result => console.log(result))

  }

  endTurn = () => {
    let myInit = {
      method: "post",
      body: JSON.stringify({roomCode: this.state.roomCode, currentUserID: this.props.match.current_user.id}),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch(`http://localhost:3000/matches/turn_end`, myInit)
    .then(resp => resp.json())
    .then(result => {if (result.status === "game end") {
      this.setState({
        currentTurn: result,
        ended: "t"
      })
    }
    else {
      this.setState({
        currentTurn: result
      }, () => console.log("result: ", result, "currentUser: ", this.state.currentUser, "currentTurn: ", this.state.currentTurn))
    }
  })



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
    .then(result => {
      console.log("RESULT",result)
      if (result.current_turn) {
        this.setState({
          started: result.started,
          savedImage: result.sketch.data,
          users: result.users,
          currentTurn: result.current_turn
        })
      } else {
        this.setState({
          started: result.started,
          savedImage: result.sketch.data,
          users: result.users
        })

      }


    })
    setTimeout(this.checkGameStatus, 5000)

  }


  render(){

    return (
      <div>
      {console.log("current Turn: ", this.state.currentTurn, "current User: ", this.state.currentUser)}
      {this.state.started === "t" && !!(this.state.currentTurn.id === this.state.currentUser.id) && <CanvasElements addToStore={this.addToStore}/>}
      {this.state.started === "t" && !!(this.state.currentTurn.id !== this.state.currentUser.id) && <Guesser savedImage={this.state.savedImage}/>}
      {this.state.started === "f" && <Button className="GameStarter" onClick={this.startGame}>Press this to start</Button>}
      <Button className="GameEnder" onClick={this.endTurn}>Press this to end the round</Button>
      {this.state.users.length !== 0 && < PlayerList players={this.state.users}/>}
      </div>
    )
  }
}
