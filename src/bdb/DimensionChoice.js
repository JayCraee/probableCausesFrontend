import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DimensionChoice extends Component {
  render() {
    const button1Text = this.props.button1Text;
    const button2Text = this.props.button2Text;

    return (
      <table id='input-choice'>
        <tbody>
          <tr align="left">
            <div>
              <Button 
                variant="light"
                onClick={() => this.props.onClick(false) }
              >
                {button1Text}
              </Button>
              <t> </t>
              <Button 
                variant="light"
                onClick={() => this.props.onClick(true)}
                
              >
                {button2Text}
              </Button>
            </div>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default DimensionChoice;