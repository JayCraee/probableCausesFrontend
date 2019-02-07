import React, {Component} from 'react';
import {Line} from 'react-konva';

class StyledDiamond extends Component {
  render() {
    let points = [
      this.props.width/2,
      0,
      this.props.width,
      this.props.height/2,
      this.props.width/2,
      this.props.height,
      0,
      this.props.height/2
    ];

    return (
      <Line
        x={100}
        y={100}
        points={points}
        tension={0}
        closed
        stroke="black"
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
      />
    )
  }
}