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
