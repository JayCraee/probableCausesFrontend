import React, {Component} from 'react';
import {Rect} from 'react-konva';

/**
 * Konva shape
 * exposes no props currently
 * expose the state you need as props if you want to use this...
 */
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
    );
  }
}

export default StyledRect;