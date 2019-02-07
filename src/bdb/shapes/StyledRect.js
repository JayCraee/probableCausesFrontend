import React, {Component} from 'react';
import {Rect} from 'react-konva';

class StyledRect extends Component {
  render() {
    return (
      <Rect
        x={200}
        y={20}
        width={150}
        height={100}
        fill="red"
        shadowBlur={10}
      />
    )
  }
}

export default StyledRect;