import React from 'react'
import { Segment } from 'semantic-ui-react'

const Guidelines = (props) => {


  return(
    <div className="Guidelines">
      <div>
        <Segment vertical className="HTP">How to play</Segment>
      </div>
      <div>
        <Segment vertical>1.  When it's your turn, draw what it tells you to draw.</Segment>
        <Segment vertical>2.  When it's not your turn, guess what the image is.</Segment>
        <Segment vertical>3.  Both the person drawing and the person guessing get points when guessed correctly.</Segment>
        <Segment vertical>4.  If Mr. Robot guesses what you drew correctly, you lose ALL your points!</Segment>
        <Segment vertical>5.  Draw well enough that people can guess what you draw.  Draw bad enough that Mr. Robot can't guess what it is.</Segment>
      </div>
    </div>

  )
}

export default Guidelines
