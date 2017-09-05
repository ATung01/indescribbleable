import React from 'react';
import {Layer, Stage} from 'react-konva';
import Drawing from './Drawing'
import {Button} from 'semantic-ui-react'

class CanvasElements extends React.Component {

  state = {
    save: false
  }

  handleClick = () => {
    this.setState({
      save: true
    }, console.log(this.state, "I set save to true"))
  }

  addToStore = (image) => {
    let myInit = {
      method: "post",
      body: JSON.stringify(image.src),
      headers: {
        "Content-Type": "application/json"
      }
    }
    return fetch("http://localhost:3000/sketches", myInit )
    .then(resp => resp.json()).then(result => console.log(result))
  }

  saveImage = () => {
    this.setState({
      save: false
    }, console.log(this.state, "I set save to false"))
    let canvas = document.getElementsByTagName('canvas')[0]
    var image = new Image();
    image.src = canvas.toDataURL("image/png").slice(22, -1) //taking out data:image/png;base64, from the front of the string
    this.addToStore(image)


  }



    render() {
        return (
          <div>
            <Stage width={500} height={500}>
                <Layer>
                   <Drawing saveState={this.state.save} saveImage={this.saveImage}/>
                </Layer>
            </Stage>
            <Button onClick={this.handleClick}/>

          </div>
        );
    }
}

export default CanvasElements;
