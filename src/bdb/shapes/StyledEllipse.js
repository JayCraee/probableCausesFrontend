import React, {Component} from 'react';
import {Circle} from 'react-konva';

class StyledEllipse extends Component {
  render() {
    let scaleX = Math.floor(this.props.width*0.5);
    let scaleY = Math.floor(this.props.height*0.5);
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        radius={1}
        fill="green"
        scaleX={scaleX}
        scaleY={scaleY}
      />
    );
  }
}

export default StyledEllipse;