import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import Expression from "./shapes/Expression";

/**
 * Side Menu of the input pane
 * Will show different things depending on which shape is clicked on the diagram
 * Need to get the currently selected field from parent
 */
class SideMenuPane extends Component {
  renderChooseExpression() {
    let expressions = ["SIMILARITY", "CORRELATION", "hello world", "hi"];

    let parentWidth = this.props.width;
    let expressionXOffsetScale = 0.1;
    let expressionHeight = 50;
    let expressionWidth = (1-2*expressionXOffsetScale) * parentWidth;

    let expressionX = expressionXOffsetScale * parentWidth;
    let verticalSpacing = Math.floor(expressionHeight*1.2);

    return (
        <Stage width={this.props.width} height={this.props.height}>
          <Layer>
            {expressions.map((expression, index) => (
              <Expression key={index} x={expressionX} y={verticalSpacing*(index+0.5)} width={expressionWidth} height={expressionHeight} expression={expression}/>
              ))}
          </Layer>
        </Stage>
    )
  }

  render() {
    const divStyle = {
      height: this.props.height+'px',
      width: this.props.width+'px',
      backgroundColor: 'powderblue',
    };

    const expressionButtons = this.renderChooseExpression();

    return (
      <div style={divStyle}>
        {expressionButtons}
      </div>
    );

  }
}

export default SideMenuPane;