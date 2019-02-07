import React, {Component} from 'react';
import {Line} from 'react-konva';

class StyledRect extends Component {
  render() {
    let points = [
      this.props.shift,
      0,
      this.props.width + this.props.shift,
      0,
      this.props.width,
      this.props.height,
      0,
      this.props.height
    ];

    return (
      <Line
        x={20}
        y={100}
        points={points}
        fill="blue"
        tension={0}
        closed
        stroke="black"
      />
    )
  }
}