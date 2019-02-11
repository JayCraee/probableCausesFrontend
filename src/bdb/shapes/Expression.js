import React, { Component } from 'react';
import { Group, Text } from 'react-konva';
import StyledEllipse from './StyledEllipse';


class Expression extends Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    const width = this.props.width;
    const height = this.props.height;
    const text = this.props.expression;
    const wrap = Boolean(this.props.wrap);

    const textOffset=0.1;

    const ellipseX = x + Math.floor(width/2);
    const ellipseY = y + Math.floor(height/2);
    let textX = x + Math.floor(width*textOffset);
    let textY;

    const textWidth = Math.floor(width*(1-2*textOffset));

    if (wrap) {
      textY = y + Math.floor(height*0.16);
    } else {
      textY = y + Math.floor(height*0.3);
    }

    return (
      <Group>
        <StyledEllipse x={ellipseX} y={ellipseY} width={width} height={height}/>
        <Text x={textX} y={textY} text={text} fontSize={20} width={textWidth} align="center"/>
      </Group>
    )
  }
}

export default Expression;