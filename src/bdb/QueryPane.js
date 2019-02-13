import React, { Component } from 'react';
import InputPane from "./InputPane";
import EstimateQuery from "./data/EstimateQuery";
import SimilarityExpression from "./data/SimilarityExpression";
import UnsupportedInputPaneOperationError from "./error/UnsupportedInputPaneOperationError";
import UnsupportedExpressionError from "./error/UnsupportedExpressionError";

class QueryPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: new EstimateQuery(),
    }
  }

  handleInputPaneClick(operationID, ...args) {
    switch (operationID) {
      case 0:
        //choose expression
        let expressionNum = args[0];
        switch (expressionNum) {
          case 0:
            let query = this.state.query;
            query.expression = new SimilarityExpression();
            this.setState({
              query: query,
            });
            break;
          default:
            throw new UnsupportedExpressionError(expressionNum);
        }
        break;
      default:
        throw new UnsupportedInputPaneOperationError(operationID);
    }
  }

  render() {
    return (
      <table id="query-pane-table">
        <tbody>
          <tr>
            <td><InputPane onClick={(operationID, ...args) => this.handleInputPaneClick(operationID, ...args)} query={this.state.query}/></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default QueryPane;