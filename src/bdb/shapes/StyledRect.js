import React, {Component} from 'react';
import {Rect} from 'react-konva';

class StyledRect extends Component {
  render() {
    return (
      <Rect
        x={100}
        y={20}
        width={100}
        height={100}
        fill="red"
        shadowBlur={10}
      />
    )
  }
}