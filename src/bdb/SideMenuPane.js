import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import StyledExpression from "./shapes/StyledExpression";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import UnsupportedSideMenuError from "./error/UnsupportedSideMenuError";

/**
 * Side Menu of the input pane
 * Will show different things depending on which shape is clicked on the diagram
 * Need to get the currently selected field from parent
 */
class SideMenuPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contextChosen: '',
    }
  }

  static wrap(expression) {
    return (String(expression).split(" ").length > 1);
  }

  renderChooseExpression() {
    //TODO: get expressions passed in from outside
    //TODO: add onClick

    let expressions = ["SIMILARITY", "CORRELATION", "PREDICTIVE PROBABILITY", "DEPENDENCE"];

    let parentWidth = this.props.width;
    let expressionXOffsetScale = 0.1;
    let expressionHeight = 50;
    let expressionWidth = (1-2*expressionXOffsetScale) * parentWidth;

    let expressionX = expressionXOffsetScale * parentWidth;
    let verticalSpacing = Math.floor(expressionHeight*1.4);

    return (
        <Stage width={this.props.width} height={this.props.height}>
          <Layer>
            {expressions.map((expression, index) => (
              <StyledExpression
                key={index}
                x={expressionX}
                y={verticalSpacing*(index+0.5)}
                width={expressionWidth}
                height={expressionHeight}
                expression={expression}
                wrap={SideMenuPane.wrap(expression)}
                onClick={()=>this.props.onClick(index)}
              />
              ))}
          </Layer>
        </Stage>
    )
  }

  /**
   * Currently drop down is not linked to anything
   */
  renderInTheContextOf() {
    //need text to show 'in the context of'
    //and a drop down menu to show column options
    //and an on click to update the query state

    //TODO: get drop down options from schema
    //TODO: update current query state when new dropdown item clicked

    let ddOptions = ['column1', 'column2'];

    return (
      <div>
        In the context of:
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {this.state.contextChosen}
          </DropdownToggle>
          <DropdownMenu>
            {ddOptions.map((columnName, index) => (
              <DropdownItem key={index} onClick={() =>
                this.setState({
                  contextChosen: columnName,
                })
              }>
                {columnName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }

  renderRowBoolexpr(rowNum) {
    return <div>RowBoolexpr{rowNum}</div>
  }

  renderOrderBy() {
    return <div>OrderByPane</div>
  }

  renderLimit() {
    return <div>LimitPane</div>
  }

  renderOptionPane(currentlySelected) {
    let optionPane;

    switch (currentlySelected) {
      case 0:
        //empty
        optionPane = "";
        break;
      case 1:
        //expression select
        optionPane = this.renderChooseExpression();
        break;
      case 2:
        //in the context of
        optionPane = this.renderInTheContextOf();
        break;
      case 3:
        //render row1 boolexpr
        optionPane = this.renderRowBoolexpr(1);
        break;
      case 4:
        //render order
        optionPane = this.renderOrderBy();
        break;
      case 5:
        //limit
        optionPane = this.renderLimit();
        break;
      case 6:
        //render row2 boolexpr
        optionPane = this.renderRowBoolexpr(2);
        break;
      default:
        throw new UnsupportedSideMenuError(currentlySelected);
    }

    return optionPane;
  }

  render() {
    const divStyle = {
      height: this.props.height+'px',
      width: this.props.width+'px',
      backgroundColor: '#7EBAD9',
    };

    return (
      <div style={divStyle}>
        {this.renderOptionPane(this.props.currentlySelected)}
      </div>
    );

  }
}

export default SideMenuPane;