import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class QueryChoicePane extends Component {
  renderEstimate() {
    let button = (
      <Button variant="light" onClick={()=>{this.props.setQuery('ESTIMATE')}}>
        Explore
      </Button>
    );

    let text = (<div className='side-menu-h3'><i>Calculate statistics about your data-set</i></div>);

    return (
      <div className='query-choice'>
        {button}
        <br/>
        {text}
      </div>
    );
  }

  renderSimulate() {
    let button = (
      <Button variant="light" onClick={()=>{this.props.setQuery('SIMULATE')}}>
        Test
      </Button>
    );

    let text = (<div className='side-menu-h3'><i>Predict new outcomes under your new initial conditions</i></div>);

    return (
      <div className='query-choice'>
        {button}
        <br/>
        {text}
      </div>
    );
  }

  render() {
    let style = {
      width: this.props.width,
      backgroundColor: '#1c6ca1',
    };

    return (
      <div style={style}>
        <table>
          <tbody>
            <tr>
              <td width="50%">
                {this.renderEstimate()}
              </td>
              <td width="50%">
                {this.renderSimulate()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default QueryChoicePane;