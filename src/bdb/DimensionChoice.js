import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DimensionChoice extends Component {
  render() {
    const button1Text = this.props.button1Text;
    const button2Text = this.props.button2Text;

    return (
      <table id='input-choice'>
        <tbody>
          <tr>
            <td>
              <Button 
                variant="light"
                onClick={() => this.props.onClick(false) }
              >
                {button1Text}
              </Button>
            </td>
            <td>
              <Button 
                variant="light"
                onClick={() => this.props.onClick(true)}
                
              >
                {button2Text}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default DimensionChoice;