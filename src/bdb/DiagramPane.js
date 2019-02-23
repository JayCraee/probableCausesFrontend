import React, { Component } from 'react';
import {Stage, Layer, Group, Arrow, Line} from 'react-konva';
import EstimateQuery from './data/EstimateQuery';
import SimilarityExpression from "./data/SimilarityExpression";
import StyledEstimate from "./shapes/StyledEstimate";
import StyledRect from "./shapes/StyledRect";
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

  renderEstimate() {

  }

  renderDiagram(query) {
    const arrowColour = "black";

    const inputY = 56;
    const processingY = 250;
    const outputY = 434;

    const line1Y = processingY - 9;
    const line2Y = outputY - 11;

    const input1X = 100;
    const input2X = 330;
    const inputBoxY = inputY + 50;
    const inputBoxHeight = 100;
    const inputArrowY1 = inputBoxY + inputBoxHeight;
    const inputArrow1X1 = input1X + inputBoxHeight/2
    const inputArrow2X1 = input2X + inputBoxHeight/2

    const similarityOffset = 20;
    const defaultOffset = 30;
    const estimateX = 125;
    let estimateY = processingY + defaultOffset;
    let inputArrowY2;

    const inputArrowXMove = 65;
    let inputArrow1Points;
    let inputArrow2Points;

    const diamondX = 165;
    const firstDiamondOffset = 20;

    const arrowX = 255;

    let firstOutputArrowY;
    let firstArrowPoints = [0,0,0,60]; //edited if orderBy not supported

    let limitY = outputY + firstDiamondOffset;

    const bottomOfDiagram = outputY + 160;
    let outputArrowY;
    let outputArrowPoints;

    let diagram;
    if (query instanceof EstimateQuery) {
      if (query.expressionChosen) {
        //draw dotted lines
        let line1 = <Line
          dash={[7, 3]}
          dashEnabled
          points={[0, line1Y, this.props.width, line1Y]}
          stroke={arrowColour}
        />;
        let line2 = <Line
          dash={[7, 3]}
          dashEnabled
          points={[0, line2Y, this.props.width, line2Y]}
          stroke={arrowColour}
        />;

        if (query.expression instanceof SimilarityExpression) {
          estimateY = processingY + similarityOffset;
          inputArrowY2 = estimateY;
          inputArrow1Points = [0,0, inputArrowXMove, inputArrowY2-inputArrowY1-5];
          inputArrow2Points = [0,0, -inputArrowXMove, inputArrowY2-inputArrowY1-5];
          firstOutputArrowY = estimateY + 120;

          let estimate;
          if (query.contextChosen) {
            // draw estimate with expression
            const extraText = "in the context of " + query.context;
            estimate = <StyledEstimate
              x={estimateX}
              y={estimateY}
              expression={query.expressionName}
              extra
              extraText={extraText}
              onClick={()=>{}}
            />;
          } else {
            // draw estimate with expression plus showing that they need to complete query
            const extraText = "in the context of ";
            estimate = <StyledEstimate
              x={estimateX}
              y={estimateY}
              expression={query.expressionName}
              todo
              extra
              extraText={extraText}
              onClick={()=>{}}
            />
          }
          let row1;
          if (query.row1Chosen) {
            if (query.row1Fixed) {
              // draw row1 as fixed
              row1 = <StyledRect
                x={input1X}
                y={inputBoxY}
                length={inputBoxHeight}
                text={"SINGLE ROW"}
                //onClick={()=>this.props.handleSelectBlock(3)}
              />
            } else {
              // draw row1 as free
              row1 = <StyledRect
                x={input1X}
                y={inputBoxY}
                length={inputBoxHeight}
                text={"EVERY ROW"}
                //onClick={()=>this.props.handleSelectBlock(0)}
              />
            }
          } else {
            // draw row1 as an option
            row1 = (<StyledRect
              x={input1X}
              length={inputBoxHeight}
              y={inputBoxY}
            />)
          }
          // draw arrow to input1
          let arrowToInput1=<Arrow
            x={inputArrow1X1}
            y={inputArrowY1}
            points={inputArrow1Points}
            fill={arrowColour}
            stroke={arrowColour}
          />;

          let row2;
          if (query.row2Chosen) {
            if (query.row2Fixed) {
              // draw row2 as fixed
              row2 = <StyledRect
                x={input2X}
                y={inputBoxY}
                length={inputBoxHeight}
                text={"SINGLE ROW"}
                //onClick={()=>this.props.handleSelectBlock(6)}
              />
            } else {
              // draw row2 as free
              row2 = <StyledRect
                x={input2X}
                y={inputBoxY}
                length={inputBoxHeight}
                text={"EVERY ROW"}
                //onClick={()=>this.props.handleSelectBlock(0)}
              />
            }
          } else {
            // draw row2 as an option
            row2 = (<StyledRect
              x={input2X}
              y={inputBoxY}
              length={inputBoxHeight}
            />)
          }

          // draw arrow to row2
          let arrowToInput2 = <Arrow
            x={inputArrow2X1}
            y={inputArrowY1}
            points={inputArrow2Points}
            fill={arrowColour}
            stroke={arrowColour}
          />;

          let optionalGroup;

          if (query.rowsComplete) {
            let limit;
            let arrowToLimit;
            if (query.limitSupported) {
              // draw limit
              limit = <Limit
                x={diamondX}
                y={limitY}
                limit={query.limit}
                />;

              // draw arrow to limit
              arrowToLimit = <Arrow
                x={arrowX}
                y={firstOutputArrowY}
                points={firstArrowPoints}
                fill={arrowColour}
                stroke={arrowColour}
              />;

              outputArrowY = limitY + 70;
            } else {
              outputArrowY = firstOutputArrowY;
            }
            outputArrowPoints = [0,0,0,bottomOfDiagram-outputArrowY];

            let outputArrow = <Arrow
              x={arrowX}
              y={outputArrowY}
              points={outputArrowPoints}
              fill={arrowColour}
              stroke={arrowColour}
            />;

            optionalGroup = (
              <Group>
                {limit}
                {arrowToLimit}
                {outputArrow}
              </Group>
            );
          }

          diagram = (
            <Group>
              {line1}
              {line2}
              {estimate}
              {row1}
              {arrowToInput1}
              {row2}
              {arrowToInput2}
              {optionalGroup}
            </Group>
          );
        } else if (query.expression instanceof CorrelationExpression) {
          estimateY = processingY + defaultOffset;
          inputArrowY2 = estimateY;
          inputArrow1Points = [0,0, inputArrowXMove, inputArrowY2-inputArrowY1-5];
          inputArrow2Points = [0,0, -inputArrowXMove, inputArrowY2-inputArrowY1-5];
          outputArrowY = estimateY + 80;
          outputArrowPoints = [0,0,0,bottomOfDiagram-outputArrowY]

          let estimate;
          estimate = <StyledEstimate
            x={estimateX}
            y={estimateY}
            expression={query.expressionName}
            onClick={()=>{}}
          />;
          let col1;
          if (query.col1Chosen) {
            if (query.col1Fixed) {
              col1 = <StyledRect
                x={input1X}
                y={inputBoxY}
                length={inputBoxHeight}
                text="SINGLE COLUMN"
              />
            } else {
              col1 = <StyledRect
                x={input1X}
                y={inputBoxY}
                length={inputBoxHeight}
                text="EVERY COLUMN"
              />
            }
          } else {
            col1 = <StyledRect
              x={input1X}
              y={inputBoxY}
              length={inputBoxHeight}
            />
          }
          let arrowToInput1 = <Arrow
            x={inputArrow1X1}
            y={inputArrowY1}
            points={inputArrow1Points}
            fill={arrowColour}
            stroke={arrowColour}
          />;

          let col2;
          if (query.col2Chosen) {
            if (query.col2Fixed) {
              col2 = <StyledRect
                x={input2X}
                y={inputBoxY}
                length={inputBoxHeight}
                text="SINGLE COLUMN"
              />
            } else {
              col2 = <StyledRect
                x={input2X}
                y={inputBoxY}
                length={inputBoxHeight}
                text="EVERY COLUMN"
              />
            }
          } else {
            col2 = <StyledRect
              x={input2X}
              y={inputBoxY}
              length={inputBoxHeight}
            />
          }
          let arrowToInput2 = <Arrow
            x={inputArrow2X1}
            y={inputArrowY1}
            points={inputArrow2Points}
            fill={arrowColour}
            stroke={arrowColour}
          />;

          let outputArrow;
          if (query.colsComplete) {
            outputArrow=<Arrow
              x={arrowX}
              y={outputArrowY}
              points={outputArrowPoints}
              fill={arrowColour}
              stroke={arrowColour}
            />
          }
          diagram = (
            <Group>
              {line1}
              {line2}
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
          x={estimateX}
          y={estimateY}
          todo
          onClick={()=>{}}
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