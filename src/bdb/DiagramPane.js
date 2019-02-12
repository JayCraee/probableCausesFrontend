import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import StyledEstimate from './shapes/StyledEstimate'
import Limit from "./shapes/Limit";

class DiagramPane extends Component {
  render() {
    const width = this.props.width;
    const height = this.props.height;
    return (
      <Stage width={width} height={height}>
        <Layer>
          <StyledEstimate/>
          <Limit x={100} y={100}/>
        </Layer>
      </Stage>
    );
  }
}

export default DiagramPane;