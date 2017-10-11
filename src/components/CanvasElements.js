import React from 'react';
import {Layer, Stage} from 'react-konva';
import Drawing from './Drawing'
import Answer from './Answer'



var canvas
var image

class CanvasElements extends React.Component {

  state = {
    save: false
  }

  saveImage = () => {
    this.setState({
      save: false
    })
    canvas = document.getElementsByTagName('canvas')[0]
    image = new Image();
    image.src = canvas.toDataURL("image/png").slice(22, -1) //taking out data:image/png;base64, from the front of the string
    this.props.sendCanvas(image)
  }
  render() {
      return (
        <div className="canvas-container">
          <h1>Your turn! </h1>
          <Stage className="Stage" width={400} height={400}>
              <Layer>
                 <Drawing saveState={this.state.save} saveImage={this.saveImage}  sendCanvas={this.props.sendCanvas}/>
              </Layer>
          </Stage>
          <Answer answer={this.props.answer} endTurn={this.props.endTurn}/>


        </div>
      );
  }
}

export default CanvasElements;
