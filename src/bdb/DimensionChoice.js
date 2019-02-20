import React, { Component } from 'react';
import { Button } from 'reactstrap';

class DimensionChoice extends Component {
  render() {
    const button1Text = this.props.button1Text;
    const button2Text = this.props.button2Text;

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

export default DimensionChoice;