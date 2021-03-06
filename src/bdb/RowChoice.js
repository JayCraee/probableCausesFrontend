import React, { Component } from 'react';
import DimensionChoice from "./DimensionChoice";

class RowChoice extends Component {
  render() {
    const button1Text = 'EVERY ROW';
    const button2Text = 'SINGLE ROW';

    return (
      <DimensionChoice
        button1Text={button1Text}
        button2Text={button2Text}
        onClick={this.props.onClick}
      />
    )
  }
}

export default RowChoice;