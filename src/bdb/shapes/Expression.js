import React, { Component } from 'react';
import { Group, Text } from 'react-konva';
import StyledEllipse from './StyledEllipse';

class Expression extends Component {
  render() {
    let x = this.props.x;
    let y = this.props.y;
    let width = this.props.width;
    let height = this.props.height;
    let text = this.props.expression;

    let ellipseX = x + Math.floor(width/2);
    let ellipseY = y + Math.floor(height/2);
    let textX = x + Math.floor(width*0.1);
    let textY = y + Math.floor(height*0.3);

    return (
      <Group>
        <StyledEllipse x={ellipseX} y={ellipseY} width={width} height={height}/>
        <Text x={textX} y={textY} text={text} fontSize={20}/>
      </Group>
    )
  }
}

export default Expression;