import React, { Component } from 'react';
import InputPane from "./InputPane";
import EstimateQuery from "./data/EstimateQuery";
import SimilarityExpression from "./data/SimilarityExpression";
import UnsupportedExpressionError from "./error/UnsupportedExpressionError";
import QueryNotFinishedError from './data/error/QueryNotFinishedError';

class QueryPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: new EstimateQuery(),
    }
  }

  queryToApi(query) {

    //compulsory fields
    let queryType= "", mode="", expression="", expname="ExpName", population="AFRICAN_DATA";

    if (query instanceof EstimateQuery) {
      queryType="estimate";

      if (query.expressionChosen) {
        if (query.expression instanceof SimilarityExpression) {

          if (!query.contextChosen) {
            throw new QueryNotFinishedError("You need to complete the query.");
          }
          if (query.rowsComplete) {

            let boolexpr1=query.row1Condition;
            let boolexpr2=query.row2Condition;
            let column=query.context;

            if (query.row1Fixed) {
              if (query.row2Fixed) {

                // row 1 fixed, row2 fixed
                mode="FROM!PAIRWISE";
                expression="SIMILARITY'OF'"+boolexpr1+"’TO’"+boolexpr2+"’IN’THE’CONTEXT’OF’"+column;

              } else {

                // row1  fixed, row2 free
                mode="FROM";
                expression="SIMILARITY’TO’"+boolexpr1+"’IN’THE’CONTEXT’OF’"+column;

              }
            } else {
              if (query.row2Fixed) {

                // row 1 free, row2 fixed
                mode="FROM"
                expression="SIMILARITY’TO’"+boolexpr2+"’IN’THE’CONTEXT’OF’"+column;

              } else {
                // row1  free, row2 free
                mode = "BY";
                expression="SIMILARITY’IN’THE’CONTEXT’OF’"+column;
              }
            }
            limit=query.limit;
            orderBy=query.orderBy;

          } else {
            throw new QueryNotFinishedError("Query not finished yet: Rows are not complete.");
          }

        } else {
          // draw estimate without expression
          throw new QueryNotFinishedError("Query not finished yet: Type of expression is not chosen.");
        }
      }
    }

    // putting together the API string
    let stringApi = "bql/query/"+queryType+"/EXPRESSION="+expression+";MODE="+mode+
      ";EXPNAME="+expname+";POPULATION="+population+
      ";LIMIT="+limit+";ORDER!BY="+orderBy;
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