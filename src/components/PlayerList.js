import React from 'react'
import { Table, Header, Card } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import RobotGuess from './RobotGuess'



const PlayerList = (props) => {
  const List = () => {
    let listBody = props.players.map((user)=>{
      return (
        <Table.Row>
        <Table.Cell>
        <Header>
        <Header.Content>
        {user.nickname}
        </Header.Content>
        </Header>
        </Table.Cell>
        <Table.Cell>
        {user.points}
        </Table.Cell>
        </Table.Row>
      )
    })


    return (
      <Table celled  className="player-list" verticalAlign="middle">
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Players</Table.HeaderCell>
      <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
      </Table.Header>
      <Table.Body>
      {listBody}
      </Table.Body>
      </Table>
    )

  }


  return (
    <div className="RoomCode">
          <Card className="RoomCode">
            <Card.Content>
              <Card.Header>RoomCode: {props.roomCode}</Card.Header>
              <Card.Description></Card.Description>
            </Card.Content>
          </Card>
          {List()}
          {props.showRobot === "t" && < RobotGuess guesses={props.robotGuess}/>}
          {props.showEndTurn && <Button className="GameEnder" onClick={props.endTurn}>Press this to end your turn</Button>}
    </div>
  )

}

export default PlayerList
