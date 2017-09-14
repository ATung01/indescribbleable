import React, { Component } from 'react';
import './App.css';
import Logger from './components/Logger'
import Lobby from './components/Lobby'
import { Grid, Image } from 'semantic-ui-react'
import ActionCableProvider from 'react-actioncable-provider'



class Homepage extends Component {

  state = {
    loggedIn: false,
    roomCode: "",
    nickname: ""
  }

  updateAppStateMatch = (match) => {
    this.setState({
      match
    })
  }

  handleRoom = (event) => {
   this.setState({roomCode: event.target.value});
  }

  handleNickname =  (event) => {
   this.setState({nickname: event.target.value});
  }

  loggedIn = () => {


    let myInit = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }
    // fetch("http://localhost:3000/matches", myInit)
    fetch("https://indescribbleable-ruby.herokuapp.com/matches", myInit)
    .then(resp => resp.json())
    .then(result => result["error"] ? this.setState({error: result["error"]}) : (this.updateAppStateMatch(result),
    this.setState({
      loggedIn: true
    })

  ))
  }

  loggedCheck = () => {
    if (this.state.loggedIn === false) {
      return (
          <div className="logger-wrapper">
            <Logger loggedIn={this.loggedIn} handleNickname={this.handleNickname} handleRoom={this.handleRoom} state={this.state} />
            <p className="error">{this.state.error}</p>
          </div>
      )

    }
    else {
      return <Lobby match={this.state.match}/>
    }
  }
  // https://media.giphy.com/media/hL8a3mIQK8Ehy/giphy.gif
  // https://media.giphy.com/media/MzS3kH6Dj0dag/giphy.gif
  // <Grid centered columns={3}>
  // </Grid>


  // <ActionCableProvider url='ws://localhost:3000/cable'>

  render() {
    return (
      <div className="Homepage container">
      {this.state.loggedIn === false && <Image className="gif" src="https://media.giphy.com/media/hL8a3mIQK8Ehy/giphy.gif" fluid />}
      <ActionCableProvider url='wss://indescribbleable-ruby.herokuapp.com/cable'>
            {this.loggedCheck()}
          </ActionCableProvider>
        </div>
    );
  }
}

export default Homepage;
