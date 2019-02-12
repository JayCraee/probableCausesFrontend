import React, { Component } from 'react';
import { Group, Text } from 'react-konva';
import StyledParallelogram from './StyledParallelogram';
import Expression from './Expression';

/**
 * Konva shape to show the Estimate box
 * Consists of outer parallelogram, text of query-name, inner Expression shape
 *
 * Currently does not expose any state
 * However, if you need to set its x, y, width, height or text externally you should
 *  pass them in as props and update the render function accordingly
 */
class Estimate extends Component {
  render() {
    const x=50;
    const y=50;
    const width=400;
    const height=100;
    const text="ESTIMATE";

    const textHorizontalIndent=0.06;
    const textHorizontalOffset=0.1;
    const textVerticalOffset=0.13;


    const expressionHorizontalOffset=0.07;
    const expressionVerticalOffset=0.45;
    const expressionHorizontalScale=0.9;
    const expressionVerticalScale=0.5;

    const parallelogramX=x;
    const parallelogramY=y;
    const textX=x+Math.floor(width*textHorizontalOffset);
    const textY=y+Math.floor(height*textVerticalOffset);
    const expressionX=x+Math.floor(width*expressionHorizontalOffset);
    const expressionY=y+Math.floor(height*expressionVerticalOffset);

    const parallelogramWidth=width;
    const parallelogramHeight=height;
    const textWidth = Math.floor(width*(1-2*textHorizontalIndent));
    const expressionWidth = Math.floor(width*expressionHorizontalScale);
    const expressionHeight = Math.floor(height*expressionVerticalScale);

    return (
      <Group>
        <StyledParallelogram x={parallelogramX} y={parallelogramY} width={parallelogramWidth} height={parallelogramHeight}/>
        <Text x={textX} y={textY} text={text} fontSize={24} fontStyle="bold" fill="#e3ecf2" width={textWidth} align="center"/>
        <Expression x={expressionX} y={expressionY} width={expressionWidth} height={expressionHeight} expression="HelloHHHHiiiiHHHHHH,worldddddddddd" wrap/>
      </Group>
    );
  }
}

export default Estimate;