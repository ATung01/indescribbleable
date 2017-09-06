import React from 'react'
import { Image, Table, Header } from 'semantic-ui-react'

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
      <Table basic='very' celled collapsing className="player-list">
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
    <div>
      {List()}
    </div>
  )

}

export default PlayerList
