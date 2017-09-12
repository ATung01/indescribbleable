import React from 'react'
import CanvasElements from './CanvasElements'
import { Button} from 'semantic-ui-react';
import PlayerList from './PlayerList'
import Guesser from './Guesser'
import {ActionCable} from 'react-actioncable-provider'
import EndScreen from './EndScreen'
import { Grid } from 'semantic-ui-react'
import ReactCountdownClock from 'react-countdown-clock'






export default class Lobby extends React.Component {

  state = {
    started: "f",
    ended: "f",
    timer: "",
    ready: "f",
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
      currentUser: this.props.match.current_user,
      users: this.props.match.users
    }, () => this.sendTurnStatus())

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
  sendToRobot = () => {
    this.refs.roomChannel.perform('sendToRobot', {image: this.state.savedImage, room_code: this.state.roomCode})
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
      })
    }
    else if (!!result.allUsers) {
      this.setState({
        users: result.allUsers
      })

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
        this.setState({
          ready: "f"
        })
        this.sendToRobot()
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
        <ActionCable ref='roomChannel' channel={{channel: 'MatchChannel', room: this.props.match.roomCode}} onReceived={this.onReceived} />
        <Grid.Column>
        {this.state.started === "t" && this.state.currentTurn.id === this.state.currentUser.id && this.state.ended === 'f' &&
        <CanvasElements
            addToStore={this.addToStore}
            sendTurnStatus={this.sendTurnStatus}
            sendCanvas={this.sendCanvas}
            />}
        </Grid.Column>

        <Grid.Column>
          {this.state.started === "t" && this.state.currentTurn.id !== this.state.currentUser.id && this.state.ended === 'f' &&
          <Guesser
            savedImage={this.state.savedImage}
            takeAGuess={this.takeAGuess}
            updateGuess={this.updateGuess}
            />}
        </Grid.Column>

        <Grid.Column>
        {this.state.started === "t" && this.state.currentTurn.id === this.state.currentUser.id && this.state.ended === 'f' &&
        <ReactCountdownClock seconds={45}
        color="#000"
        size={50}
        onComplete={this.endTurn} />}
          {this.state.started === "f" && <Button className="GameStarter" onClick={this.startGame}>Press this to start</Button>}
          <Button className="GameEnder" onClick={this.endTurn}>Press this to end the round</Button>
          < PlayerList players={this.state.users} />
          {this.state.ended === "t" && < EndScreen />}
        </Grid.Column>

      </div>
    )
  }
}
