import React from 'react';
import {Layer, Stage} from 'react-konva';
import Drawing from './Drawing'
import {Button} from 'semantic-ui-react'

class CanvasElements extends React.Component {

  state = {
    save: false
  }

  // convertCanvasToImage = (canvas) => {
	// var image = new Image();
	// image.src = canvas.toDataURL("image/png");
	// return image;
  // }
  handleClick = () => {
    this.setState({
      save: true
    }, console.log(this.state, "I set save to true"))
  }

  saveImage = () => {
    this.setState({
      save: false
    }, console.log(this.state, "I set save to false"))
    let canvas = document.getElementsByTagName('canvas')[0]
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      debugger

    
  }



    render() {
        return (
          <div>
            <Stage width={1000} height={1000}>
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
