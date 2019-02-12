import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import Estimate from './shapes/Estimate'
import Limit from "./shapes/Limit";

class DiagramPane extends Component {
  render() {
    const width = this.props.width;
    const height = this.props.height;
    return (
      <Stage width={width} height={height}>
        <Layer>
          <Estimate/>
          <Limit x={100} y={100}/>
        </Layer>
      </Stage>
    );
  }
}

export default DiagramPane;