import React, { Component } from 'react';
import StyledDiamond from './StyledDiamond'

class Limit extends Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    const text = "LIMIT";

    return (
      <StyledDiamond x={x} y={y} text={text}/>
    );
  }
}

export default Limit;