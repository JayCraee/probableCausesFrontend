import React, { Component } from 'react';
import { Group } from 'react-konva';
import StyledRect from './StyledRect';
import ButtonShape from './ButtonShape';

class RowChoice extends Component {
  render() {
    const rectX = this.props.x;
    const rectY = this.props.y;

    const button1X = rectX + 3;
    const button1Y = rectY + 10;
    const button2X = rectX + 3;
    const button2Y = rectY + 55;

    const button1Text = 'EVERY ROW';
    const button2Text = 'SINGLE ROW';

    return (
      <Group>
        <StyledRect x={rectX} y={rectY}/>
        <ButtonShape x={button1X} y={button1Y} text={button1Text} onClick={()=>this.props.onClick(false)}/>
        <ButtonShape x={button2X} y={button2Y} text={button2Text} onClick={()=>this.props.onClick(true)}/>
      </Group>
    )
  }
}

export default RowChoice;