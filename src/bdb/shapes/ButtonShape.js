import React, { Component } from 'react';
import { Rect, Group, Text } from 'react-konva';

class ButtonShape extends Component {
  render() {
    const textOffsetX = 5;
    const textOffsetY = 10;
    const textX = this.props.x + textOffsetX;
    const textY = this.props.y + textOffsetY;

    const width = 94;
    const height = 30;
    const textWidth = width-2*textOffsetX;

    return (
      <Group>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={width}
          height={height}
          cornerRadius={5}
          fill='#5990ea'
          stroke='black'
          onClick={this.props.onClick}
        />
        <Text
          x={textX}
          y={textY}
          width={textWidth}
          text={this.props.text}
          fill='#e3ecf2'
          align='center'
          onClick={this.props.onClick}
        />
      </Group>
    )
  }
}

export default ButtonShape;