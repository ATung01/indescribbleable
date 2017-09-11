import React from 'react'
import CanvasElements from './CanvasElements'
import { Button} from 'semantic-ui-react';
import PlayerList from './PlayerList'
import Guesser from './Guesser'
import {ActionCable} from 'react-actioncable-provider'
import EndScreen from './EndScreen'





export default class Lobby extends React.Component {

  state = {
    started: "f",
    ended: "f",
    users: [],
    currentUser: {id:0},
    currentTurn: {id:0},
    savedImage: "",
    guess: "",
    correct: "f",
    points: 0
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
  sendTurnStatus = () => {
    this.refs.roomChannel.perform('checkGameStatus', {id: this.props.match.current_user.match_id})
  }

  sendCanvas = (image) => {
    this.refs.roomChannel.perform('sendCanvas', {image: image.src, room_code: this.state.roomCode})
  }

  updateGuess = (event) => {
    this.setState({
      guess: event.target.value
    })
  }
  takeAGuess = () => {
    this.refs.roomChannel.perform('takeAGuess', {
      id: this.props.match.current_user.match_id,
      guess: this.state.guess,
      current_user_ID: this.state.currentUser.id,
      current_turn_ID: this.state.currentTurn.id
    })
  }

  onReceived = (result) => {
    if (!!result.startGame) {
      this.setState({
        roomCode: result.startGame.current_match.room_code,
        users: result.startGame.all_users,
        started: 't',
        answer: result.startGame.current_match.answer,
        currentTurn: result.startGame.current_turn
      }, () => console.log(this.state.answer))
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
      else if (!!result.endGame) {
        this.setState({
          ended: "t"
        })
      }
      else if (!!result.endTurn) {
        console.log(result.endTurn)
        this.sendTurnStatus()
      }
      else if (!!result.guess.points) {
        this.sendTurnStatus()
      }
      else if (!!result.guess.wrong) {
        console.log("wrong answer")
      }
      else {
        console.log("error", result)
      }
    }


  render(){

    return (
      <div>
        <ActionCable ref='roomChannel' channel={{channel: 'MatchChannel'}} onReceived={this.onReceived} />

        {this.state.started === "t" && this.state.currentTurn.id === this.state.currentUser.id && this.state.ended === 'f' &&
        <CanvasElements
            addToStore={this.addToStore}
            sendTurnStatus={this.sendTurnStatus}
            sendCanvas={this.sendCanvas}
            />}
          {this.state.started === "t" && this.state.currentTurn.id !== this.state.currentUser.id && this.state.ended === 'f' &&
          <Guesser
            savedImage={this.state.savedImage}
            takeAGuess={this.takeAGuess}
            updateGuess={this.updateGuess}
            />}
          {this.state.started === "f" && <Button className="GameStarter" onClick={this.startGame}>Press this to start</Button>}
          <Button className="GameEnder" onClick={this.endTurn}>Press this to end the round</Button>
          < PlayerList players={this.state.users} />
          <Button onClick={this.sendTurnStatus}>Click here to get Ready</Button>
          {this.state.ended === "t" && < EndScreen />}



      </div>
    )
  }
}
