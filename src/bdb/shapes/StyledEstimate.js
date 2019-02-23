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
    const x=this.props.x;
    const y=this.props.y;
    const width=250;
    const height=80;
    const text="ESTIMATE";
    const expression=this.props.expression;

    const textHorizontalIndent=0.06;
    // const textHorizontalOffset=0.1;
    // const textVerticalOffset=0.13;

    let expressionHorizontalOffset=(this.props.extra)?0.12:0.1;
    const expressionVerticalOffset=0.1;
    const expressionHorizontalScale=0.9;
    const expressionVerticalScale=(this.props.extra)?0.7:0.8;

    const parallelogramX=x;
    const parallelogramY=y;
    // const textX=x+Math.floor(width*textHorizontalOffset);
    // const textY=y+Math.floor(height*textVerticalOffset);
    const expressionX=x+Math.floor(width*expressionHorizontalOffset);
    const expressionY=y+Math.floor(height*expressionVerticalOffset);

    const parallelogramWidth=width;
    let parallelogramHeight=height;
    const textWidth = Math.floor(width*(1-2*textHorizontalIndent));
    const expressionWidth = Math.floor(width*expressionHorizontalScale);
    const expressionHeight = Math.floor(height*expressionVerticalScale);

    if (this.props.extra) {
      parallelogramHeight*=1.5;
    }
    const extraTextX=x+Math.floor(width*0.1);
    const extraTextY=y+Math.floor(height*0.85);

    return (
      <Group>
        <StyledParallelogram
          x={parallelogramX}
          y={parallelogramY}
          width={parallelogramWidth}
          height={parallelogramHeight}
        />
        {/*<Text*/}
          {/*x={textX}*/}
          {/*y={textY}*/}
          {/*text={text}*/}
          {/*fontSize={24}*/}
          {/*fontStyle="bold"*/}
          {/*fill="#e3ecf2"*/}
          {/*width={textWidth}*/}
          {/*align="center"/>*/}
        <StyledExpression
          x={expressionX}
          y={expressionY}
          width={expressionWidth}
          height={expressionHeight}
          expression={expression}
          //onClick={this.props.onClick}
        />
        <Text
          x={extraTextX}
          y={extraTextY}
          text={this.props.extraText}
          fontSize={24}
          fontStyle="bold"
          fill="#e3ecf2"
          width={textWidth}
          align="center"/>
      </Group>
    );
  }
}

export default StyledEstimate;