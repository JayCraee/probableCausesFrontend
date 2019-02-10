import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import Estimate from './shapes/Estimate'

class DiagramPane extends Component {
  render() {
    let width = this.props.width;
    let height = this.props.height;
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