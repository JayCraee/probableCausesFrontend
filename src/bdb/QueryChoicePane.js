import React, {Component} from 'react';
import Query from "./data/Query";

class QueryChoicePane extends Component {
  renderEstimate() {
    let button = (
      <button onClick={()=>{this.props.setQuery('ESTIMATE')}}>
        Explore
      </button>
    );

    let text = 'Calculate statistics about your data-set';

    return (
      <div>
        {button}
        {text}
      </div>
    );
  }

  renderSimulate() {
    let button = (
      <button onClick={()=>{this.props.setQuery('SIMULATE')}}>
        Test
      </button>
    );

    let text = 'Predict new outcomes under your new initial conditions';

    return (
      <div>
        {button}
        {text}
      </div>
    );
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              {this.renderEstimate()}
            </td>
            <td>
              {this.renderSimulate()}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default QueryChoicePane;