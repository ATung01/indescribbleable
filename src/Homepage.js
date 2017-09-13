import React, { Component } from 'react';
import './App.css';
import Logger from './components/Logger'
import Lobby from './components/Lobby'
import { Grid } from 'semantic-ui-react'
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
    fetch("https://indescribbleable-ruby.herokuapp.com/matches", myInit)
    .then(resp => resp.json())
    .then(result => result["error"] ? console.log(result) : (this.updateAppStateMatch(result),
    this.setState({
      loggedIn: true
    })

  ))
  }

  loggedCheck = () => {
    if (this.state.loggedIn === false) {
      return (
        <Grid.Column>
          <Logger loggedIn={this.loggedIn} handleNickname={this.handleNickname} handleRoom={this.handleRoom} state={this.state} />
        </Grid.Column>
      )

    }
    else {
      return <Lobby  match={this.state.match}/>
    }
  }

  render() {
    return (
      <div className="Homepage container">
      <ActionCableProvider url='wss://indescribbleable-ruby.herokuapp.com/cable'>
        <Grid centered columns={3}>
              {this.loggedCheck()}
          </Grid>
          </ActionCableProvider>
        </div>
    );
  }
}

export default Homepage;
