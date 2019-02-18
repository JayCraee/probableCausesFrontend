import React, { Component } from 'react';
import { Button } from 'reactstrap';

class RowChoice extends Component {
  render() {
    const rectX = this.props.x;
    const rectY = this.props.y;

    const button1X = rectX + 3;
    const button1Y = rectY + 10;
    const button2X = rectX + 3;
    const button2Y = rectY + 55;

    const button1Text = 'EVERY ROW';
    const button2Text = 'SINGLE ROW';

    return (
      <div>
        <Button onClick={
          () => this.props.onClick(false)
        }>
          {button1Text}
        </Button>
        <Button onClick={
          () => this.props.onClick(true)
        }>
          {button2Text}
        </Button>
      </div>
    )
  }
}

export default RowChoice;