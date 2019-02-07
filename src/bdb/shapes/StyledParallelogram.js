import React, {Component} from 'react';
import {Line} from 'react-konva';

class StyledParallelogram extends Component {
  render() {
    let width = 80;
    let height = 50;
    let shift = 20;
    let points = [
      shift,
      0,
      width + shift,
      0,
      width,
      height,
      0,
      height
    ];

    return (
      <Line
        x={20}
        y={200}
        points={points}
        fill="blue"
        tension={0}
        closed
        stroke="black"
      />
    )
  }
}

export default StyledParallelogram;