import React, { Component } from 'react';
import InputPane from "./InputPane";
import OutputPane from "./OutputPane";
import OperationsPane from "./OperationsPane";
import EstimateQuery from "./data/EstimateQuery";
import SimilarityExpression from "./data/SimilarityExpression";
import UnsupportedExpressionError from "./error/UnsupportedExpressionError";
import QueryNotFinishedError from './data/error/QueryNotFinishedError';
import CorrelationExpression from "./data/CorrelationExpression";
import SimulateQuery from "./data/SimulateQuery";
import UnsupportedQueryError from "./error/UnsupportedQueryError";

class QueryPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: undefined,
      results: undefined,
    }
  }

  queryToURL() {
    let population = this.props.population;
    //compulsory fields
    let queryType;
    // separator character between fields
    let splitChar="-";

    if (this.state.query instanceof EstimateQuery) {
      queryType="estimate";

      let mode;
      let expression;
      let expressionName;
      // optional fields
      let limit;
      if (this.state.query.expressionChosen) {
        // expressionName = this.state.query.expressionName;
        // ESTIMATE SIMILARITY
        if (this.state.query.expression instanceof SimilarityExpression) {
          if (!this.state.query.contextChosen) {
            throw new QueryNotFinishedError("You need to complete the query.");
          }
          if (this.state.query.rowsComplete) {
            let column = this.state.query.context;
            if (this.state.query.row1Fixed) {
              let boolexpr1 = "("+this.state.query.row1Condition+")";
              if (this.state.query.row2Fixed) {
                let boolexpr2 = "("+this.state.query.row2Condition+")";
                // row 1 fixed, row2 fixed
                mode = "BY";
                expression = "SIMILARITY!OF!" + boolexpr1 + "!TO!" + boolexpr2 + "!IN!THE!CONTEXT!OF!" + column;
              } else {
                // row1  fixed, row2 free
                mode = "FROM";
                expression = "SIMILARITY!TO!" + boolexpr1 + "!IN!THE!CONTEXT!OF!" + column;
              }
            } else {
              if (this.state.query.row2Fixed) {
                let boolexpr2 = "("+this.state.query.row2Condition+")";
                // row 1 free, row2 fixed
                mode = "FROM";
                expression = "SIMILARITY!TO!" + boolexpr2 + "!IN!THE!CONTEXT!OF!" + column;
              } else {
                // row1  free, row2 free
                mode = "FROM_PAIRWISE";
                expression = "SIMILARITY!IN!THE!CONTEXT!OF!" + column;
              }
            }
            if (this.state.query.limitSupported) {
              limit = this.state.query.limit;
            } else {
              limit = 50;
            }

            return (
              "bql/query/"
              + queryType + "/"
              + "EXPRESSION=" + expression
              + splitChar + "MODE=" + mode
              + splitChar + "POPULATION=" + population
              + splitChar + "LIMIT=" + limit
            );
          } else {
            throw new QueryNotFinishedError("Query not finished yet: Rows are not complete.");
          }

        } else if (this.state.query.expression instanceof CorrelationExpression) {
          // ESTIMATE CORRELATION
          expressionName = 'corr';
          //  convert query object into URlString for ESTIMATE CORRELATION
          if (this.state.query.colsComplete) {
            if (this.state.query.col1Fixed) {
              let col1 = this.state.query.col1Name;
              if (this.state.query.col2Fixed) {
                let col2 = this.state.query.col2Name;
                mode = "BY";
                expression = "CORRELATION!OF!"+col1+"!WITH!"+col2;
              } else {
                mode = "FROM_VARIABLES_OF";
                expression = "CORRELATION!WITH!"+col1;
              }
            } else {
              if (this.state.query.col2Fixed) {
                let col2 = this.state.query.col2Name;
                mode = "FROM_VARIABLES_OF";
                expression = "CORRELATION!WITH!"+col2;
              } else {
                mode = "FROM_PAIRWISE_VARIABLES_OF";
                expression = "CORRELATION";
              }
            }
            return (
              "bql/query/"
              + queryType + "/"
              + "EXPRESSION=" + expression
              + splitChar + "MODE=" + mode
              + splitChar + "EXPNAME=" + expressionName
              + splitChar + "POPULATION=" + population
            );
          } else {
            throw new QueryNotFinishedError("Query not finished yet: Cols not complete");
          }
        } else {
          throw new QueryNotFinishedError("Query not finished yet: That expression is not supported.");
        }
      } else {
        throw new QueryNotFinishedError("Query not finished yet: Type of expression is not chosen.");
      }
    } else if (this.state.query instanceof SimulateQuery) {
      // convert query object into URLString for ESTIMATE CORRELATION
      if (this.state.query.simulateQueryComplete) {
        queryType = 'simulate';
        let constraints = "";
        for (const constraint of this.state.query.constraints) {
          constraints += constraint.field + "=" + constraint.value + ",";
        }
        //take off the last comma
        constraints = constraints.slice(0, -1);
        let fieldsToSimulate = "";
        for (const field of this.state.query.fieldsToSimulate) {
          fieldsToSimulate += field + ",";
        }
        //take off the last comma
        fieldsToSimulate = fieldsToSimulate.slice(0, -1);
        return (
          "bql/query/"
          + queryType + "/"
          + "COLNAMES=" + fieldsToSimulate
          + splitChar + "GIVEN=" + constraints
          + splitChar + "POPULATION=" + population
        );
      } else {
        throw new QueryNotFinishedError("Query not finished yet")
      }
    }
  }

  parseEstimateResponse(
    response,
    expName,
    actualExpressionName,
    colID,
    rowID,
    dimensions
  ) {
    let jsonResponse = response[0];
    //response.toJSON is in format
    // [[
    //    { "expName": <value>,
    //      "name0": <name0>,
    //      "name1": <name1> }
    //    ,
    //    etc
    //  ]]
    // name0 will be the same in every cell if 1D

    // fill colNames with name0
    let colNames = [];
    let rowNames = [];
    let values = []; //outer array is of rows, each inner array is a row

    for (let cell of jsonResponse) {
      let col = cell[colID]+"";
      let row = cell[rowID]+"";
      let correlation = Number(cell[expName].toFixed(5));

      //re-size arrays if necessary
      if (!colNames.includes(col)) {
        // add new column to each row
        for (let rowValues of values) {
          rowValues.push(0);
        }
        // add new colName
        colNames.push(col);
        // initialise all values to 0
      }
      if (!rowNames.includes(row)) {
        // add new row
        let newRow = new Array(colNames.length);
        // initialise all values to 0
        for (let i = 0; i < colNames.length; ++i) {
          newRow[i] = 0;
        }
        values.push(newRow);
        // add to rowName
        rowNames.push(row);
      }
      values[rowNames.indexOf(row)][colNames.indexOf(col)] = correlation;
    }

    let results = {
      query: 'ESTIMATE',
      expression: actualExpressionName,
      dimensions: dimensions,
      colNames: colNames.slice(),
      rows: []
    };
    for (const index in rowNames) {
      let nextRow = {
        rowName: rowNames[index],
        values: values[index].slice(),
      };
      results.rows.push(nextRow);
    }

    this.setState({results: results});
  }

  parseCorrelationResponse(response, expName, dimensions) {
    this.parseEstimateResponse(
      response,
      expName,
      'CORRELATION',
      'name1',
      'name0',
      dimensions
    );
  }

  parseSimilarityResponse(response, expName, dimensions) {
    this.parseEstimateResponse(
      response,
      expName,
      'SIMILARITY',
      'rowid1',
      'rowid0',
      dimensions
    );
  }

  handleChooseExpression(expression) {
    let query = this.state.query;
    switch (expression) {
      case 'SIMILARITY':
        query.expression = new SimilarityExpression();
        this.setState({
          query: query,
        });
        break;
      case 'CORRELATION':
        query.expression = new CorrelationExpression();
        this.setState({
          query: query,
        });
        break;
      default:
        throw new UnsupportedExpressionError(expression);
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

  handleFixCol(colNum, fixed) {
    let query = this.state.query;
    if (colNum === 1) {
      query.col1Fixed = fixed;
    } else {
      query.col2Fixed = fixed;
    }
    this.setState({
      query: query,
    });
  }

  handleChangeColName(colNum, name) {
    let query = this.state.query;
    if (colNum === 1) {
      query.col1Name = name;
    } else if (colNum === 2) {
      query.col2Name = name;
    }
    this.setState({
      query: query,
    });
  }

  handleChangeConstraint(key, field, value) {
    let query = this.state.query;
    query.changeConstraint(key, field, value);
    this.setState({
      query: query,
    })
  }

  handleAddConstraint(field, value) {
    let query = this.state.query;
    query.addNewConstraint(field, value);
    this.setState({
      query: query
    })
  }

  handleRemoveConstraint(key) {
    let query = this.state.query;
    query.removeConstraint(key);
    this.setState({
      query: query
    })
  }

  handleChangeFieldToSimulate(key, field) {
    let query = this.state.query;
    query.changeFieldToSimulate(key, field);
    this.setState({
      query: query
    })
  }

  handleAddFieldToSimulate(field) {
    let query = this.state.query;
    query.addNewFieldToSimulate(field);
    this.setState({
      query: query
    })
  }

  handleRemoveFieldToSimulate(key) {
    let query = this.state.query;
    query.removeFieldToSimulate(key);
    this.setState({
      query: query
    })
  }

  handleSetQuery(query) {
    switch(query) {
      case 'ESTIMATE':
        this.setState({
          query: new EstimateQuery(),
        });
        break;
      case 'SIMULATE':
        this.setState({
          query: new SimulateQuery(),
        });
        break;
      default:
        throw new UnsupportedQueryError(query);
    }
  }

  async runCorrelationQuery(url, dimensions) {
    let response;
    try {
      response = await (await fetch(url)).json();
      // some processing to turn response into formatted json for Nori
      this.parseCorrelationResponse(response, 'corr', dimensions);
    } catch (e) {

    }

  }

  async runSimilarityQuery(url, dimensions) {
    const response = await (await fetch(url)).json();
    // some processing to turn response into formatted json for Nori
    this.parseSimilarityResponse(response, 'value', dimensions);
  }

  parseSimulateResponse(response, fieldsToSimulate) {
    let data = response[0];
    let colNames = [];
    let values = [];

    let simulatedColumns = "";
    for (const field of fieldsToSimulate) {
      simulatedColumns += field + "_"
    }
    simulatedColumns = simulatedColumns.slice(0, -1);

    let max = 0;
    for (const cell of data) {
      max = (cell.frequency > max) ? cell.frequency : max;
    }

    for (const cell of data) {
      colNames.push(cell[simulatedColumns]);
      values.push(Number((cell.frequency / max).toFixed(5)));
    }

    let results = {
      query: 'SIMULATE',
      expression: 'Scaled frequency of each outcome',
      dimensions: 1,
      colNames : colNames,
      rows: [
        {
          rowName: simulatedColumns,
          values: values,
        }
      ]
    };

    this.setState({
      results: results
    })
  }

  async runSimulateQuery(url, fieldsToSimulate) {
    const response = await (await fetch(url)).json();

    this.parseSimulateResponse(response, fieldsToSimulate);
  }


  handleRunQuery() {
    // gets URL from queryToURL
    // calls backend with URL
    // set results state
    let url = this.queryToURL();

    if (this.state.query instanceof EstimateQuery) {
      if (this.state.query.expression instanceof CorrelationExpression) {
        this.runCorrelationQuery(
          url,
          this.state.query.dimensions
        );
      } else if (this.state.query.expression instanceof SimilarityExpression) {
        this.runSimilarityQuery(
          url,
          this.state.query.dimensions
        )
      }
    } else if (this.state.query instanceof SimulateQuery) {
      this.runSimulateQuery(
        url,
        this.state.query.fieldsToSimulate
        );
    }
  }

  render() {
    let output = (this.state.results !== undefined) ? (
      <OutputPane
        query={this.state.query}
        results={this.state.results}
      />
    ) : (
      undefined
    );

    return (
      <table id="query-pane-table">
        <tbody>
          <tr align="center">
            <td id="input-pane">
              <InputPane
                query={this.state.query}
                columns={this.props.columns}
                nominalColumns={this.props.nominalColumns}
                handleChooseExpression={expression=>this.handleChooseExpression(expression)}
                handleFixRow={(rowNum, fixed)=>this.handleFixRow(rowNum, fixed)}
                handleChangeSimilarityContext={columnName=>this.handleChangeSimilarityContext(columnName)}
                handleChangeLimit={limit=>this.handleChangeLimit(limit)}
                handleChangeOrderBy={order=>this.handleChangeOrderBy(order)}
                handleChangeRowBoolExpr={(rowNum, boolExpr)=>this.handleChangeRowBoolExpr(rowNum, boolExpr)}
                handleFixCol={(colNum, fixed)=>this.handleFixCol(colNum, fixed)}
                handleChangeColName={(colNum, name)=>this.handleChangeColName(colNum, name)}
                handleChangeConstraint={(key, field, value)=>this.handleChangeConstraint(key, field, value)}
                handleAddConstraint={(field, value)=>this.handleAddConstraint(field, value)}
                handleRemoveConstraint={key=>this.handleRemoveConstraint(key)}
                handleChangeFieldToSimulate={(key, field)=>this.handleChangeFieldToSimulate(key, field)}
                handleAddFieldToSimulate={field=>this.handleAddFieldToSimulate(field)}
                handleRemoveFieldToSimulate={key=>this.handleRemoveFieldToSimulate(key)}
                handleSetQuery={query=>this.handleSetQuery(query)}
              />
            </td>
          </tr>
          <tr align="center">
            <td>
              <OperationsPane
                handleRunQuery={()=>this.handleRunQuery()}
              />
            </td>
          </tr>
          <tr align="center">
            <td>
              {output}
            </td>
          </tr>
          </tbody>
      </table>
    )
  }
}

export default QueryPane;