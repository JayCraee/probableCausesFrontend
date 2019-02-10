import React, {Component} from 'react';
import {Line} from 'react-konva';

class StyledParallelogram extends Component {
  render() {
    const width = this.props.width;
    const height = this.props.height;
    const shift = Math.floor(width*0.1);
    const points = [
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
        x={this.props.x}
        y={this.props.y}
        points={points}
        fill="blue"
        tension={0}
        closed
        stroke="black"
      />
    );
  }
}

export default StyledParallelogram;