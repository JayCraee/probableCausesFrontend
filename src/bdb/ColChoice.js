import React, { Component } from 'react';
import DimensionChoice from "./DimensionChoice";

class ColChoice extends Component {
  render() {
    const button1Text = 'EVERY COLUMN';
    const button2Text = 'SINGLE COLUMN';

    return (
      <DimensionChoice
        button1Text={button1Text}
        button2Text={button2Text}
        onClick={this.props.onClick}
      />
    )
  }
}

export default ColChoice;