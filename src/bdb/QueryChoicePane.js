import React, {Component} from 'react';
import {Button} from 'reactstrap';

class QueryChoicePane extends Component {
  renderEstimate() {
    let button = (
      <Button onClick={()=>{this.props.setQuery('ESTIMATE')}}>
        Explore
      </Button>
    );

    let text = (<div className='side-menu-h3'>Calculate statistics about your data-set</div>);

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
      <Button onClick={()=>{this.props.setQuery('SIMULATE')}}>
        Test
      </Button>
    );

    let text = (<div className='side-menu-h3'>Predict new outcomes under your new initial conditions</div>);

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
      backgroundColor: '#7EBAD9',
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