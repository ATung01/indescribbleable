import React from 'react'
import CanvasElements from './CanvasElements'
import { Button} from 'semantic-ui-react';
import PlayerList from './PlayerList'
import Guesser from './Guesser'
import {ActionCable} from 'react-actioncable-provider'





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


  }
  startGame = () => {
      this.setState({
        roomCode: this.props.match.roomCode,
        currentTurn: this.props.match.current_user,
        started: true
      })

    this.refs.roomChannel.perform('startGame', {
      started: true,
      currentUserID: this.props.match.current_user.id,
      roomCode: this.props.match.roomCode,
      currentTurn: this.props.match.current_user
    })
  }

  endTurn = () => {
    this.refs.roomChannel.perform('endTurn', {
      roomCode: this.state.roomCode,
      currentTurnID: this.state.currentTurn.id
    })
  }

  // startGame = () => {
  //   this.setState({
  //     roomCode: this.props.match.roomCode,
  //     users: this.props.match.users,
  //     currentTurn: this.props.match.current_user,
  //     started: true
  //   })
  //
  //   let myInit = {
  //     method: "PATCH",
  //     body: JSON.stringify({started: true, currentUserID: this.props.match.current_user.id}),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }
  //   return fetch(`http://localhost:3000/matches/${this.props.match.current_user.match_id}`, myInit )
  //   .then(resp => resp.json())
  //   .then(result => console.log(result))
  //
  // }

  // endTurn = () => {
  //   let myInit = {
  //     method: "post",
  //     body: JSON.stringify({roomCode: this.state.roomCode, currentUserID: this.props.match.current_user.id}),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }
  //   fetch(`http://localhost:3000/matches/turn_end`, myInit)
  //   .then(resp => resp.json())
  //   .then(result => {if (result.status === "game end") {
  //     this.setState({
  //       currentTurn: result,
  //       ended: "t"
  //     })
  //   }
  //   else {
  //     this.setState({
  //       currentTurn: result
  //     })
  //   }
  // })
  // }

  // addToStore = (image) => {
  //   let myInit = {
  //     method: "post",
  //     body: JSON.stringify({image: image.src, room_code: this.state.roomCode}),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }
  //   return fetch("http://localhost:3000/sketches", myInit )
  //   .then(resp => resp.json())
  //   .then(result => this.setState({
  //     savedImage: result.data
  //   }))
  // }

  // checkGameStatus = () => {
  //   fetch(`http://localhost:3000/matches/${this.props.match.current_user.match_id}`)
  //   .then(resp => resp.json())
  //   .then(result => {
  //     console.log("RESULT",result)
  //       this.setState({
  //         started: result.started,
  //         savedImage: result.sketch.data,
  //         users: result.users,
  //         currentTurn: result.current_turn
  //     })
  //   })
  //   setTimeout(this.checkGameStatus, 5000)
  //
  // }

  onReceived = (result) => {
    if (!!result.startGame) {
      this.setState({
        roomCode: result.startGame.current_match.room_code,
        users: result.startGame.all_users,
        started: 't',
        answer: result.startGame.current_match.answer,
        currentTurn: result.startGame.current_turn
      }, () => console.log(this.state.currentTurn))
    }
      else if (!!result.status) {
        this.setState({
          started: result.status.started,
          savedImage: result.status.sketch.data,
          users: result.status.users,
          currentTurn: result.status.current_turn
        })
      }
      else if (!!result.canvas) {
        this.setState({
            savedImage: result.canvas
          })
      }
      else if (!!result.endTurn) {
        console.log(result.endTurn)
      }
      else {
        console.log("error", result)
      }
    }

  sendTurnStatus = () => {
    this.refs.roomChannel.perform('checkGameStatus', {id: `${this.props.match.current_user.match_id}`})
  }

  sendCanvas = (image) => {
    this.refs.roomChannel.perform('sendCanvas', {image: image.src, room_code: this.state.roomCode})
  }

  render(){

    return (
      <div>
        <ActionCable ref='roomChannel' channel={{channel: 'MatchChannel'}} onReceived={this.onReceived} />
          {this.state.started === "t" && this.state.currentTurn.id === this.state.currentUser.id && <CanvasElements addToStore={this.addToStore}
           sendTurnStatus={this.sendTurnStatus}
           sendCanvas={this.sendCanvas}/>}
          {this.state.started === "t" && this.state.currentTurn.id !== this.state.currentUser.id && <Guesser savedImage={this.state.savedImage}/>}
          {this.state.started === "f" && <Button className="GameStarter" onClick={this.startGame}>Press this to start</Button>}
          <Button className="GameEnder" onClick={this.endTurn}>Press this to end the round</Button>
          {this.state.users.length !== 0 && < PlayerList players={this.state.users}/>}
          <button onClick={this.sendTurnStatus}>Send turn</button>
          <button onClick={this.sendCanvas}>Send canvas</button>

      </div>
    )
  }
}
