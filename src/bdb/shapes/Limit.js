import React, { Component } from 'react';
import StyledDiamond from './StyledDiamond'

/**
 * Konva shape
 * Diamond that says LIMIT
 * exposes x and y as props
 */
class Limit extends Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    const text = "LIMIT";

    return (
      <StyledDiamond x={x} y={y} text={text} onClick={this.props.onClick}/>
    );
  }
}

export default Limit;