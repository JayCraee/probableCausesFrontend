import React, {Component} from 'react';
import {Circle} from 'react-konva';

/**
 * Konva shape that extends to the midpoints of a bounding rectangle
 * Exposes x, y, width and height as props
 * x and y are the centre of the ellipse
 */
class StyledEllipse extends Component {
  render() {
    let fill='#e3ecf2';

    const scaleX = Math.floor(this.props.width*0.5);
    const scaleY = Math.floor(this.props.height*0.5);
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        radius={1}
        fill={fill}
        scaleX={scaleX}
        scaleY={scaleY}
        onClick={this.props.onClick}
      />
    );
  }
}

export default StyledEllipse;