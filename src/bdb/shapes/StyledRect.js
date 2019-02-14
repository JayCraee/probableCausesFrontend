import React, {Component} from 'react';
import { Rect, Group, Text} from 'react-konva';

/**
 * Konva shape
 * exposes no props currently
 * expose the state you need as props if you want to use this...
 */
class StyledRect extends Component {
  render() {
    let fill='#7EBAD9';
    return (
      <Group>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={100}
          height={100}
          stroke="black"
          fill={fill}
          onClick={this.props.onClick}
        />
        <Text
          x={this.props.x+5}
          y={this.props.y+30}
          width={90}
          wrap
          text={this.props.text}
          fontSize={20}
          align="center"
          fill='#e3ecf2'
          onClick={this.props.onClick}/>
      </Group>
    );
  }
}

export default StyledRect;