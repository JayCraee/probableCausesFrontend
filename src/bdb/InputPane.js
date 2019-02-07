import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';
import StyledEllipse from './shapes/StyledEllipse';
import StyledRect from './shapes/StyledRect';
import StyledDiamond from './shapes/StyledDiamond';
import StyledParallelogram from './shapes/StyledParallelogram';

class InputPane extends Component {
  render() {
    let width = 500;
    let height = 500;
    return (
      <Stage width={width} height={height}>
        <Layer>
          <StyledEllipse/>
          <StyledRect/>
          <StyledParallelogram/>
          <StyledDiamond/>
        </Layer>
      </Stage>
    )
  }
}

export default InputPane;