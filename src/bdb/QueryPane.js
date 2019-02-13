import React, { Component } from 'react';
import InputPane from "./InputPane";
import QueryNotFinishedError from './data/error/QueryNotFinishedError';


class QueryPane extends Component {
  
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

  render() {
    return (
      <table id="query-pane-table">
        <tbody>
          <tr>
            <td><InputPane/></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default QueryPane;