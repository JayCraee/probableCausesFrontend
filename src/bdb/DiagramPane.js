import React, { Component } from 'react';
import {Stage, Layer, Group} from 'react-konva';
import EstimateQuery from './data/EstimateQuery';
import SimilarityExpression from "./data/SimilarityExpression";

class DiagramPane extends Component {
  renderDiagram(query) {
    let diagram;
    if (query instanceof EstimateQuery) {
      if (query.expressionChosen) {
        if (query.expression instanceof SimilarityExpression) {
          let estimate;
          if (query.contextChosen) {
            //TODO: draw estimate with expression
          } else {
            //TODO: draw estimate with expression plus showing that they need to complete query
          }
          let row1;
          if (query.row1Chosen) {
            if (query.row1Fixed()) {
              //TODO: draw row1 as fixed
            } else {
              //TODO: draw row1 as free
            }
          } else {
            //TODO: draw row1 as an option
          }
          let arrowToRow1;
          //TODO: draw arrow to row1
          let row2;
          if (query.row2Chosen) {
            if (query.row2Fixed()) {
              //TODO: draw row2 as fixed
            } else {
              //TODO: draw row2 as free
            }
          } else {
            //TODO: draw row2 as an option
          }
          let arrowToRow2;
          //TODO: draw arrow to row2
          let orderBy;
          //TODO: draw order by
          let arrowToOrderBy;
          //TODO: draw arrow to order by
          let limit;
          //TODO: draw limit
          let arrowToLimit;
          //TODO: draw arrow to limit
          diagram = (
            <Group>
              {estimate}
              {row1}
              {arrowToRow1}
              {row2}
              {arrowToRow2}
              {orderBy}
              {arrowToOrderBy}
              {limit}
              {arrowToLimit}
            </Group>
          )
        }
      } else {
        //TODO: draw estimate without expression
      }
    }
    return diagram;
  }

  render() {

    const width = this.props.width;
    const height = this.props.height;

    let query;

    return (
      <Stage width={width} height={height}>
        <Layer>
          {this.renderDiagram(query)}
        </Layer>
      </Stage>
    );
  }
}

export default DiagramPane;