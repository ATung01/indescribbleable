import React from 'react'

const dataStr = "data:image/png;base64, "

export default class Guesser extends React.Component{



  updateImage = () => {
    return dataStr.concat(this.props.savedImage)
  }


  render(){
    return (
      <div >
        <img src={this.updateImage()} alt=""/>
        {console.log(this.props)}
      </div>
    )
  }
}
