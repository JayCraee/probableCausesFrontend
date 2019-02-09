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
    let wrap = Boolean(this.props.wrap);

    let textOffset=0.1;

    let ellipseX = x + Math.floor(width/2);
    let ellipseY = y + Math.floor(height/2);
    let textX = x + Math.floor(width*textOffset);
    let textY;

    let textWidth = Math.floor(width*(1-2*textOffset));

    if (wrap) {
      textY = y + Math.floor(height*0.16);
    } else {
      textY = y + Math.floor(height*0.3);
    }

    return (
      <Group>
        <StyledEllipse x={ellipseX} y={ellipseY} width={width} height={height}/>
        <Text x={textX} y={textY} text={text} fontSize={20} width={textWidth}/>
      </Group>
    )
  }
}

export default Expression;