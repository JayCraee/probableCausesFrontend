import React, { Component } from 'react';
import {Stage, Layer, Group, Arrow} from 'react-konva';
import EstimateQuery from './data/EstimateQuery';
import SimilarityExpression from "./data/SimilarityExpression";
import StyledEstimate from "./shapes/StyledEstimate";
import FixedFreeRect from "./shapes/FixedFreeRect";
import StyledRect from "./shapes/StyledRect";
import OrderBy from "./shapes/OrderBy";
import Limit from "./shapes/Limit";

class DiagramPane extends Component {
  renderDiagram(query) {
    const row1X = 100;
    const rowY = 30;
    const row2X = 330;

    const arrowToRow1X = 150;
    const arrowToRowY = 130;
    const arrowToRow1Points = [0,0,65,65];
    const arrowColour = "black";
    const arrowToRow2X = 370;
    const arrowToRow2Points = [0,0,-65,65];

    const orderByX = 180;
    const orderByY = 350;

    const arrowToOrderByX = 255;
    const arrowToOrderByY = 300;
    const arrowBetweenDiamondsPoints = [0,0,0,50];

    const limitX = 180;
    const limitY = 470;

    const arrowToLimitX = 255;
    const arrowToLimitY = 420;

    let diagram;
    if (query instanceof EstimateQuery) {
      if (query.expressionChosen) {
        if (query.expression instanceof SimilarityExpression) {
          let estimate;
          if (query.contextChosen) {
            // draw estimate with expression
            estimate = <StyledEstimate expression={query.expressionName}/>;
          } else {
            // draw estimate with expression plus showing that they need to complete query
            estimate = <StyledEstimate expression={query.expressionName + " todo "}/>
          }
          let row1;
          if (query.row1Chosen) {
            if (query.row1Fixed) {
              // draw row1 as fixed
              row1 = <StyledRect x={row1X} y={rowY} text={"SINGLE ROW"}/>
            } else {
              // draw row1 as free
              row1 = <StyledRect x={row1X} y={rowY} text={"EVERY ROW"}/>
            }
          } else {
            // draw row1 as an option
            row1 = <StyledRect x={row1X} y={rowY}/>
          }
          //TODO: draw arrow to row1
          let arrowToRow1= <Arrow
            x={arrowToRow1X}
            y={arrowToRowY}
            points={arrowToRow1Points}
            fill={arrowColour}
            stroke={arrowColour}/>;

          let row2;
          if (query.row2Chosen) {
            if (query.row2Fixed) {
              // draw row2 as fixed
              row2 = <StyledRect x={row2X} y={rowY} text={"SINGLE ROW"}/>
            } else {
              //TODO: draw row2 as free
              row2 = <StyledRect x={row2X} y={rowY} text={"EVERY ROW"}/>
            }
          } else {
            // draw row2 as an option
            row2 = <StyledRect x={row2X} y={rowY}/>
          }

          // draw arrow to row2
          let arrowToRow2 = <Arrow
            x={arrowToRow2X}
            y={arrowToRowY}
            points={arrowToRow2Points}
            fill={arrowColour}
            stroke={arrowColour}
          />;

          let optionalGroup;

          if (query.rowsComplete) {

            // draw order by
            let orderBy = <OrderBy x={orderByX} y={orderByY}/>;

            // draw arrow to order by
            let arrowToOrderBy = <Arrow
              x={arrowToOrderByX}
              y={arrowToOrderByY}
              points={arrowBetweenDiamondsPoints}
              fill={arrowColour}
              stroke={arrowColour}
            />;

            // draw limit
            let limit = <Limit x={limitX} y={limitY}/>;

            // draw arrow to limit
            let arrowToLimit = <Arrow
              x={arrowToLimitX}
              y={arrowToLimitY}
              points={arrowBetweenDiamondsPoints}
              fill={arrowColour}
              stroke={arrowColour}
            />;

            optionalGroup = (
              <Group>
                {orderBy}
                {arrowToOrderBy}
                {limit}
                {arrowToLimit}
              </Group>
            );
          }


          diagram = (
            <Group>
              {estimate}
              {row1}
              {arrowToRow1}
              {row2}
              {arrowToRow2}
              {optionalGroup}
            </Group>
          )
        }
      } else {
        // draw estimate without expression
        diagram = <StyledEstimate/>;
      }
    }
    return diagram;
  }

  render() {

    const width = this.props.width;
    const height = this.props.height;

    let query = new EstimateQuery();
    query.expression = new SimilarityExpression();
    query.context = "column1";
    query.row1Fixed = true;
    query.row2Fixed = false;

    return (
      <Stage width={width} height={height}>
        <Layer>
          {this.renderDiagram(query)}
        </Layer>
      </Stage>
    )
  }
}

export default DiagramPane;