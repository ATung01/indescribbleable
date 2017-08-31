import React, { Component } from 'react';
import './App.css';
import Logger from './components/Logger'
import Lobby from './components/Lobby'
import { Grid } from 'semantic-ui-react'


class Homepage extends Component {

  state = {
    loggedIn: true,
    roomCode: "",
    nickname: "",
    match: {
      match: {},
      users: []
    }
  }

  updateAppStateMatch = (newMatch) => {
    console.log('updateAppStateMatch: ', this.state.match)
    this.setState({
      match: {
        match: newMatch.match,
        users: newMatch.users
      }
    })
  }

  handleRoom = (event) => {
   this.setState({roomCode: event.target.value});
  }

  handleNickname =  (event) => {
   this.setState({nickname: event.target.value});
  }

  loggedIn = () => {
    console.log(this.state)
    this.setState({
      loggedIn: true
    }, () => console.log(this.state) )
  }

  loggedCheck = () => {
    if (this.state.loggedIn === false) {
      return <Logger loggedIn={this.loggedIn} handleNickname={this.handleNickname} handleRoom={this.handleRoom} state={this.state}/>
    }
    else {
      return <Lobby  />
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
