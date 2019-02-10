import React, {Component} from 'react';
import {Line} from 'react-konva';

class StyledDiamond extends Component {
  render() {
    const width = 100;
    const height = 70;

    const points = [
      width/2,
      0,
      width,
      height/2,
      width/2,
      height,
      0,
      height/2
    ];

    return (
      <Line
        x={200}
        y={200}
        points={points}
        tension={0}
        closed
        stroke="black"
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
      />
    );
  }
}

export default StyledDiamond;