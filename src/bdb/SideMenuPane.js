import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import StyledExpression from "./shapes/StyledExpression";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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

  renderChooseExpression() {
    //TODO: get expressions passed in from outside
    //TODO: add onClick

    let expressions = ["SIMILARITY", "CORRELATION", "hello world", "hi"];

    let parentWidth = this.props.width;
    let expressionXOffsetScale = 0.1;
    let expressionHeight = 50;
    let expressionWidth = (1-2*expressionXOffsetScale) * parentWidth;

    let expressionX = expressionXOffsetScale * parentWidth;
    let verticalSpacing = Math.floor(expressionHeight*1.2);

    return (
        <Stage width={this.props.width} height={this.props.height}>
          <Layer>
            {expressions.map((expression, index) => (
              <StyledExpression key={index} x={expressionX} y={verticalSpacing*(index+0.5)} width={expressionWidth} height={expressionHeight} expression={expression}/>
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

  render() {
    const divStyle = {
      height: this.props.height+'px',
      width: this.props.width+'px',
      backgroundColor: '#7EBAD9',
    };

    const expressionButtons = this.renderChooseExpression();

    // const expressionButtons = this.renderInTheContextOf();

    return (
      <div style={divStyle}>
        {expressionButtons}
      </div>
    );

  }
}

export default SideMenuPane;