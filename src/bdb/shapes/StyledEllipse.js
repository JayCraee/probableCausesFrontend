import React, {Component} from 'react';
import {Circle} from 'react-konva';

class StyledEllipse extends Component {
  render() {
    return (
      <Circle
        x={100}
        y={100}
        radius={1}
        fill="green"
        scaleX={100}
        scaleY={50}
      />
    )
  }
}

export default StyledEllipse;