import React from 'react';
import {Layer, Stage} from 'react-konva';
import Drawing from './Drawing'
import {Button} from 'semantic-ui-react'

var canvas
var image

class CanvasElements extends React.Component {

  state = {
    save: false
  }

  componentDidMount(){
    this.pollToSave()
  }

  pollToSave = () => {
    this.setState({
      save: true
    }, console.log(this.state, "I set save to true"))
    setTimeout(this.pollToSave, 500)
  }



  saveImage = () => {
    this.setState({
      save: false
    }, console.log(this.state, "I set save to false"))
    canvas = document.getElementsByTagName('canvas')[0]
    image = new Image();
    image.src = canvas.toDataURL("image/png").slice(22, -1) //taking out data:image/png;base64, from the front of the string
    this.props.addToStore(image)

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
