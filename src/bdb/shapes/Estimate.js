import React, { Component } from 'react';
import { Group, Text } from 'react-konva';
import StyledParallelogram from './StyledParallelogram';
import Expression from './Expression';

class Estimate extends Component {
  render() {
    let x=50;
    let y=50;
    let width=400;
    let height=100;
    let text="ESTIMATE";

    let textHorizontalIndent=0.06;
    let textHorizontalOffset=0.1;
    let textVerticalOffset=0.13;


    let expressionHorizontalOffset=0.07;
    let expressionVerticalOffset=0.45;
    let expressionHorizontalScale=0.9;
    let expressionVerticalScale=0.5;

    let parallelogramX=x;
    let parallelogramY=y;
    let textX=x+Math.floor(width*textHorizontalOffset);
    let textY=y+Math.floor(height*textVerticalOffset);
    let expressionX=x+Math.floor(width*expressionHorizontalOffset);
    let expressionY=y+Math.floor(height*expressionVerticalOffset);

    let parallelogramWidth=width;
    let parallelogramHeight=height;
    let textWidth = Math.floor(width*(1-2*textHorizontalIndent));
    let expressionWidth = Math.floor(width*expressionHorizontalScale);
    let expressionHeight = Math.floor(height*expressionVerticalScale);

    return (
      <Group>
        <StyledParallelogram x={parallelogramX} y={parallelogramY} width={parallelogramWidth} height={parallelogramHeight}/>
        <Text x={textX} y={textY} text={text} fontSize={24} fontStyle="bold" fill="white" width={textWidth} align="center"/>
        <Expression x={expressionX} y={expressionY} width={expressionWidth} height={expressionHeight} expression="HelloHHHHiiiiHHHHHH,worldddddddddd" wrap/>
      </Group>
    );
  }
}

export default Estimate;