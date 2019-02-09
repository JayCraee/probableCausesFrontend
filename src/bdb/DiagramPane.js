import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import Estimate from './shapes/Estimate'

class DiagramPane extends Component {
  render() {
    let width = 500;
    let height = 500;
    return (
      <Stage width={width} height={height}>
        <Layer>
          <Estimate/>
        </Layer>
      </Stage>
    );
  }
}

export default DiagramPane;