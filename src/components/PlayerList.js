import React from 'react'
import { Image, Table, Header, Card, Grid } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'


const PlayerList = (props) => {
  const List = () => {
    let listBody = props.players.map((user)=>{
      return (
        <Table.Row>
        <Table.Cell>
        <Header as='h4' image>
        <Image src='/assets/images/avatar/small/lena.png' shape='rounded' size='mini' />
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
      <Table.HeaderCell>Player</Table.HeaderCell>
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
          <Button className="GameEnder" onClick={props.endTurn}>Press this to end your turn</Button>
    </div>
  )

}

export default PlayerList
