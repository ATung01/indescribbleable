import React, { Component } from 'react';
import './App.css';
import Logger from './components/Logger'
import Lobby from './components/Lobby'
import { Grid } from 'semantic-ui-react'


class Homepage extends Component {

  state = {
    loggedIn: false,
    roomCode: "",
    nickname: ""
  }

  updateAppStateMatch = (match) => {
    console.log('updateAppStateMatch: ', this.state.match, match)
    this.setState({
      match
    }, () => console.log(this.state.match))
  }

  handleRoom = (event) => {
   this.setState({roomCode: event.target.value});
  }

  handleNickname =  (event) => {
   this.setState({nickname: event.target.value});
  }

  loggedIn = () => {


    let myInit = {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch("http://localhost:3000/matches", myInit)
    .then(resp => resp.json())
    .then(result => result["error"] ? console.log(result) : (this.updateAppStateMatch(result),
    this.setState({
      loggedIn: true
    })

  ))
  }

  loggedCheck = () => {
    if (this.state.loggedIn === false) {
      return <Logger loggedIn={this.loggedIn} handleNickname={this.handleNickname} handleRoom={this.handleRoom} state={this.state}/>
    }
    else {
      return <Lobby  match={this.state.match}/>
    }
  }



  render() {
    return (
      <div className="Homepage container">
        <Grid centered columns={3}>
            <Grid.Column>
              {this.loggedCheck()}
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Homepage;
