import React, {Component} from 'react';
import {Line, Text, Group} from 'react-konva';

/**
 * Konva shape creating a diamond with corners of at the midpoints of the bounding rectangle
 * The size of the bounding rectangle is defined by width and height
 * Currently x, y and text are exposed as props
 */
class StyledDiamond extends Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    const text = this.props.text;
    const width = 200;
    const height = 140;

    const textXOffset = 0.1;
    const textYOffset = 0.3;

    const textX = x + Math.floor(width*textXOffset);
    const textY = y + Math.floor(width*textYOffset);
    const textWidth = Math.floor(width*(1-2*(textXOffset)));

    const points = [
      width/2,
      0,
      width,
      height/2,
      width/2,
      height,
      0,
      height/2
    ];

    return (
      <Group>
        <Line
          x={x}
          y={y}
          points={points}
          tension={0}
          closed
          stroke="black"
          fill="#7EBAD9"
        />
        <Text x={textX} y={textY} text={text} fontSize={20} width={textWidth} align="center" fill="#e3ecf2"/>
      </Group>
    );
  }
}

export default StyledDiamond;