import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import StyledExpression from "./shapes/StyledExpression";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  Input,
  Button
} from 'reactstrap';
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
      limitChosen: '',
      orderChosen: '',
      row1BoolExpr: '',
      row2BoolExpr: '',
    };
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

    let divStyle = {
      textAlign: 'center',
      color: '#e3ecf2'
    };

    return (
      <div>
        <div style={divStyle}>
          Select a statistic
        </div>
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
      </div>
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
              <DropdownItem key={index} onClick={() => {
                this.setState({
                  contextChosen: columnName,
                });
                this.props.onClick(columnName);
              }}>
                {columnName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }

  renderRow1BoolExpr() {
    let rowBoolExpr = '';
    if (this.props.query.row1ConditionChosen) {
      rowBoolExpr = this.props.query.row1Condition;
    }
    return (
      <div>
        ROW 1
        <br/>
        The single row that you are comparing against will be the first row of the table that matches the boolean
        expression that you write here
        <InputGroup className='row1Input' onChange={
          evt=>{
            this.setState({
              row1BoolExpr: evt.target.value,
            })
          }
        }>
          <Input defaultValue={rowBoolExpr}/>
        </InputGroup>
        <Button onClick={
          ()=>this.props.onClick(this.state.row1BoolExpr)
        }>
          Update
        </Button>
      </div>
    )
  }

  renderRow2BoolExpr() {
    let rowBoolExpr = '';
    if (this.props.query.row2ConditionChosen) {
      rowBoolExpr = this.props.query.row2Condition;
    }
    return (
      <div>
        ROW 2
        <br/>
        The single row that you are comparing against will be the first row of the table that matches the boolean
        expression that you write here
        <InputGroup className='row2Input' onChange={
          evt=>{
            this.setState({
              row2BoolExpr: evt.target.value,
            })
          }
        }>
          <Input defaultValue={rowBoolExpr}/>
        </InputGroup>
        <Button onClick={
          ()=>this.props.onClick(this.state.row2BoolExpr)
        }>
          Update
        </Button>
      </div>
    )
  }

  renderOrderBy() {
    let orderOptions = ['ASC', 'DESC'];
    return (
      <div>
        ORDER BY:
        <br/>
        Enter the new direction you would like to order the rows in.
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {this.props.query.orderBy}
          </DropdownToggle>
          <DropdownMenu>
            {orderOptions.map((order, index) => (
              <DropdownItem key={index} onClick={() => {
                this.setState({
                  orderChosen: order,
                });
                this.props.onClick(order);
              }}>
                {order}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>)
  }

  renderLimit() {
    return (
      <div>
        LIMIT:
        <br/>
        Enter the new number of rows of results you would like returned.
        <InputGroup className='limitInput' onChange={
          evt=>{
            this.setState({
              limitChosen: evt.target.value,
            })
          }
        }>
          <Input type='number' step='1' defaultValue={this.props.query.limit}/>
        </InputGroup>
        <Button onClick={
          ()=>this.props.onClick(this.state.limitChosen)
        }>
          Update
        </Button>
      </div>
    )
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
        //render row1 boolExpr
        optionPane = this.renderRow1BoolExpr();
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
        //render row2 boolExpr
        optionPane = this.renderRow2BoolExpr();
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