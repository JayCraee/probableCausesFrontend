import React, {Component} from 'react';
import {Line} from 'react-konva';

/**
 * Konva shape
 * Exposes x, y, width, height as props
 * Actual width is a bit wider as it adds a lean depending on how wide the parallelogram is
 */
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
        fill="#1c6ca1"
        tension={0}
        closed
        //stroke="black"
        //onClick={this.props.onClick}
      />
    );
  }
}

export default StyledParallelogram;