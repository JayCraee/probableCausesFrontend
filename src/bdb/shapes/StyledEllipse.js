import React, {Component} from 'react';
import {Circle} from 'react-konva';

class StyledEllipse extends Component {
  render() {
    return (
      <Circle
        x={0}
        y={0}
        radius={1}
        fill="green"
        xscale={100}
        yscale={50}
      />
    )
  }
}