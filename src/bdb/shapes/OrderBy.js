import React, { Component } from 'react';
import StyledDiamond from './StyledDiamond'

/**
 * Konva shape
 * Diamond that says ORDER
 * exposes x and y as props
 */
class OrderBy extends Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    const text = "ORDER "+this.props.order;

    return (
      <StyledDiamond x={x} y={y} text={text} onClick={this.props.onClick}/>
    );
  }
}

export default OrderBy;