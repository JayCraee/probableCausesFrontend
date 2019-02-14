import React, { Component } from 'react';
import InputPane from "./InputPane";
import EstimateQuery from "./data/EstimateQuery";
import SimilarityExpression from "./data/SimilarityExpression";
import UnsupportedExpressionError from "./error/UnsupportedExpressionError";

class QueryPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: new EstimateQuery(),
    }
  }

  handleChooseExpression(expressionNum) {
    let query = this.state.query;
    switch (expressionNum) {
      case 0:
        query.expression = new SimilarityExpression();
        this.setState({
          query: query,
        });
        break;
      default:
        throw new UnsupportedExpressionError(expressionNum);
    }
  }

  handleFixRow(rowNum, fixed) {
    let query = this.state.query;
    if (rowNum === 1) {
      query.row1Fixed = fixed;
    } else {
      query.row2Fixed = fixed;
    }
    this.setState({
      query: query,
    });
  }

  handleChangeSimilarityContext(columnName) {
    let query = this.state.query;
    query.context = columnName;
    this.setState({
      query: query,
    });
  }

  handleChangeLimit(limit) {
    let query = this.state.query;
    query.limit = limit;
    this.setState({
      query: query,
    });
  }

  handleChangeOrderBy(order) {
    let query = this.state.query;
    query.orderBy = order;
    this.setState({
      query: query,
    });
  }

  handleChangeRowBoolExpr(rowNum, boolExpr) {
    let query = this.state.query;
    if (rowNum === 1) {
      query.row1Condition = boolExpr;
    } else if (rowNum === 2) {
      query.row2Condition = boolExpr;
    }
    this.setState({
      query: query,
    });
  }

  render() {
    return (
      <table id="query-pane-table">
        <tbody>
          <tr>
            <td>
              <InputPane
                query={this.state.query}
                handleChooseExpression={expressionNum=>this.handleChooseExpression(expressionNum)}
                handleFixRow={(rowNum, fixed)=>this.handleFixRow(rowNum, fixed)}
                handleChangeSimilarityContext={columnName=>this.handleChangeSimilarityContext(columnName)}
                handleChangeLimit={limit=>this.handleChangeLimit(limit)}
                handleChangeOrderBy={order=>this.handleChangeOrderBy(order)}
                handleChangeRowBoolExpr={(rowNum, boolExpr)=>this.handleChangeRowBoolExpr(rowNum, boolExpr)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default QueryPane;