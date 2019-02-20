import React, { Component } from 'react';
import {Stage, Layer, Group, Arrow} from 'react-konva';
import EstimateQuery from './data/EstimateQuery';
import SimilarityExpression from "./data/SimilarityExpression";
import StyledEstimate from "./shapes/StyledEstimate";
import StyledRect from "./shapes/StyledRect";
import OrderBy from "./shapes/OrderBy";
import Limit from "./shapes/Limit";
import CorrelationExpression from "./data/CorrelationExpression";

class DiagramPane extends Component {

  renderArrowToInput(X, points, colour) {
    const arrowToInputY = 130;

    return <Arrow
      x={X}
      y={arrowToInputY}
      points={points}
      fill={colour}
      stroke={colour}/>;
  }

  renderArrowToInput1(colour) {
    const arrowToInput1X = 150;
    const arrowToInput1Points = [0,0,65,65];

    return this.renderArrowToInput(arrowToInput1X, arrowToInput1Points, colour);
  }

  renderArrowToInput2(colour) {
    const arrowToInput2X = 370;
    const arrowToInput2Points = [0,0,-65,65];

    return this.renderArrowToInput(arrowToInput2X, arrowToInput2Points, colour);
  }

  renderDiagram(query) {
    //TODO: draw context

    const input1X = 100;
    const inputY = 30;
    const input2X = 330;

    const diamondX = 165;
    const orderByY = 350;

    const arrowColour = "black";

    const arrowX = 255;

    const arrowToOrderByY = 300;
    const arrowBetweenDiamondsPoints = [0,0,0,50]; //edited if orderBy not supported

    let limitY = 470;

    let arrowToLimitY = 420;

    let outputArrowY = 540;

    let diagram;
    if (query instanceof EstimateQuery) {
      if (query.expressionChosen) {
        if (query.expression instanceof SimilarityExpression) {
          let estimate;
          if (query.contextChosen) {
            // draw estimate with expression
            const extraText = "in the context of " + query.context;
            estimate = <StyledEstimate
              expression={query.expressionName}
              extra
              extraText={extraText}
              //onClick={()=>this.props.handleSelectBlock(2)}
              onClick={()=>{}}
            />;
          } else {
            // draw estimate with expression plus showing that they need to complete query
            const extraText = "in the context of ";
            estimate = <StyledEstimate
              expression={query.expressionName}
              todo
              extra
              extraText={extraText}
              //onClick={()=>this.props.handleSelectBlock(2)}
              onClick={()=>{}}
            />
          }
          let row1;
          if (query.row1Chosen) {
            if (query.row1Fixed) {
              // draw row1 as fixed
              row1 = <StyledRect
                x={input1X}
                y={inputY}
                text={"SINGLE ROW"}
                //onClick={()=>this.props.handleSelectBlock(3)}
              />
            } else {
              // draw row1 as free
              row1 = <StyledRect
                x={input1X}
                y={inputY}
                text={"EVERY ROW"}
                //onClick={()=>this.props.handleSelectBlock(0)}
              />
            }
          } else {
            // draw row1 as an option
            row1 = (<StyledRect
              x={input1X}
              y={inputY}
            />)
          }
          // draw arrow to input1
          let arrowToInput1= this.renderArrowToInput1(arrowColour);

          let row2;
          if (query.row2Chosen) {
            if (query.row2Fixed) {
              // draw row2 as fixed
              row2 = <StyledRect
                x={input2X}
                y={inputY}
                text={"SINGLE ROW"}
                //onClick={()=>this.props.handleSelectBlock(6)}
              />
            } else {
              // draw row2 as free
              row2 = <StyledRect
                x={input2X}
                y={inputY}
                text={"EVERY ROW"}
                //onClick={()=>this.props.handleSelectBlock(0)}
              />
            }
          } else {
            // draw row2 as an option
            row2 = (<StyledRect
              x={input2X}
              y={inputY}
            />)
          }

          // draw arrow to row2
          let arrowToInput2 = this.renderArrowToInput2(arrowColour);

          let optionalGroup;

          if (query.rowsComplete) {
            let orderBy;
            let arrowToOrderBy;
            if (query.orderBySupported) {
              // draw order by
              orderBy = <OrderBy
                x={diamondX}
                y={orderByY}
                //onClick={()=>this.props.handleSelectBlock(4)}
                order={this.props.query.orderBy}
              />;

              // draw arrow to order by
              arrowToOrderBy = <Arrow
                x={arrowX}
                y={arrowToOrderByY}
                points={arrowBetweenDiamondsPoints}
                fill={arrowColour}
                stroke={arrowColour}
              />;
            } else {
              limitY = orderByY;
              outputArrowY = arrowToLimitY;
              arrowToLimitY = arrowToOrderByY;
            }

            let limit;
            let arrowToLimit;
            if (query.limitSupported) {
              // draw limit
              limit = <Limit
                x={diamondX}
                y={limitY}
                limit={query.limit}
                //onClick={()=>this.props.handleSelectBlock(5)}
                />;

              // draw arrow to limit
              arrowToLimit = <Arrow
                x={arrowX}
                y={arrowToLimitY}
                points={arrowBetweenDiamondsPoints}
                fill={arrowColour}
                stroke={arrowColour}
              />;
            } else {
              outputArrowY = arrowToLimitY;
            }

            let outputArrow = <Arrow
              x={arrowX}
              y={outputArrowY}
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
                {outputArrow}
              </Group>
            );
          }

          diagram = (
            <Group>
              {estimate}
              {row1}
              {arrowToInput1}
              {row2}
              {arrowToInput2}
              {optionalGroup}
            </Group>
          );
        } else if (query.expression instanceof CorrelationExpression) {
          let estimate;
          estimate = <StyledEstimate
            expression={query.expressionName}
            onClick={()=>{}}
          />;
          let col1;
          if (query.col1Chosen) {
            if (query.col1Fixed) {
              col1 = <StyledRect
                x={input1X}
                y={inputY}
                text="SINGLE COLUMN"
              />
            } else {
              col1 = <StyledRect
                x={input1X}
                y={inputY}
                text="EVERY COLUMN"
              />
            }
          } else {
            col1 = <StyledRect
              x={input1X}
              y={inputY}
            />
          }
          let arrowToInput1 = this.renderArrowToInput1(arrowColour);
          let col2;
          if (query.col2Chosen) {
            if (query.col2Fixed) {
              col2 = <StyledRect
                x={input2X}
                y={inputY}
                text="SINGLE COLUMN"
              />
            } else {
              col2 = <StyledRect
                x={input2X}
                y={inputY}
                text="EVERY COLUMN"
              />
            }
          } else {
            col2 = <StyledRect
              x={input2X}
              y={inputY}
            />
          }
          let arrowToInput2 = this.renderArrowToInput2(arrowColour);

          let outputArrow;
          if (query.colsComplete) {
            outputArrow=<Arrow
              x={arrowX}
              y={arrowToOrderByY}
              points={arrowBetweenDiamondsPoints}
              fill={arrowColour}
              stroke={arrowColour}
            />
          }
          diagram = (
            <Group>
              {estimate}
              {col1}
              {arrowToInput1}
              {col2}
              {arrowToInput2}
              {outputArrow}
            </Group>
          )

        }
      } else {
        // draw estimate without expression
        diagram = <StyledEstimate
          todo
          onClick={()=>{}}
          //onClick={()=>this.props.handleSelectBlock(1)}
        />;
      }
    }
    return diagram;
  }

  render() {

    const width = this.props.width;
    const height = this.props.height;

    return (
      <Stage width={width} height={height}>
        <Layer>
          {this.renderDiagram(this.props.query)}
        </Layer>
      </Stage>
    )
  }
}

export default DiagramPane;