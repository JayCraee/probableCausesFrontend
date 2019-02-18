import React, { Component } from 'react';
import { Group, Text } from 'react-konva';
import StyledParallelogram from './StyledParallelogram';
import StyledExpression from './StyledExpression';

/**
 * Konva shape to show the StyledEstimate box
 * Consists of outer parallelogram, text of query-name, inner StyledExpression shape
 *
 * Currently does not expose any state
 * However, if you need to set its x, y, width, height or text externally you should
 *  pass them in as props and update the render function accordingly
 */
class StyledEstimate extends Component {
  render() {
    const x=125;
    const y=200;
    const width=250;
    const height=100;
    const text="ESTIMATE";
    const expression=this.props.expression;

    const textHorizontalIndent=0.06;
    const textHorizontalOffset=0.1;
    const textVerticalOffset=0.13;

    //TODO: add second optional text field
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
        <StyledParallelogram
          x={parallelogramX}
          y={parallelogramY}
          width={parallelogramWidth}
          height={parallelogramHeight}
        />
        <Text
          x={textX}
          y={textY}
          text={text}
          fontSize={24}
          fontStyle="bold"
          fill="#e3ecf2"
          width={textWidth}
          align="center"/>
        <StyledExpression
          x={expressionX}
          y={expressionY}
          width={expressionWidth}
          height={expressionHeight}
          expression={expression}
          //onClick={this.props.onClick}
        />
      </Group>
    );
  }
}

export default StyledEstimate;