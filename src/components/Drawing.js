import React from "react";
import { Image} from "react-konva";

export default class Drawing extends React.Component {
  state = {
    isDrawing: false,
    mode: "brush"
  };

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext("2d");

    this.setState({ canvas, context });
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.saveState === true) {
      console.log("doing something", nextProps)
      nextProps.saveImage()
    }
  }

  handleMouseDown = () => {
    console.log("mousedown");
    this.setState({ isDrawing: true });

    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();
  };

  handleMouseUp = () => {
    console.log("mouseup");
    this.setState({ isDrawing: false });
  };

  handleMouseMove = () => {
    // console.log('mousemove');
    const { context, isDrawing, mode } = this.state;

    if (isDrawing) {
      console.log("drawing");

      context.strokeStyle = "#2E4053";
      context.lineJoin = "round";
      context.lineWidth = 5;

      if (mode === "brush") {
        context.globalCompositeOperation = "source-over";
      } else if (mode === "eraser") {
        context.globalCompositeOperation = "destination-out";
      }
      context.beginPath();

      var localPos = {
        x: this.lastPointerPosition.x - this.image.x(),
        y: this.lastPointerPosition.y - this.image.y()
      };
      console.log("moveTo", localPos);
      context.moveTo(localPos.x, localPos.y);

      const stage = this.image.parent.parent;

      var pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - this.image.x(),
        y: pos.y - this.image.y()
      };
      console.log("lineTo", localPos);
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      this.lastPointerPosition = pos;
      this.image.getLayer().draw();
    }
  };






    render() {
    const { canvas } = this.state;

    return (
      <Image
        id={"grabbable"}
        image={canvas}
        ref={node => (this.image = node)}
        width={500}
        height={500}
        stroke="black"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />

    );
  }
}
