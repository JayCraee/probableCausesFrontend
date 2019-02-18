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
import EstimateQuery from "./data/EstimateQuery";
import RowChoice from "./RowChoice";
import BqlStudio from "./BqlStudio";

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
    let parentWidth = this.props.width;
    let expressionXOffsetScale = 0.1;
    let expressionHeight = 50;
    let expressionWidth = (1-2*expressionXOffsetScale) * parentWidth;

    let expressionX = expressionXOffsetScale * parentWidth;
    let verticalSpacing = Math.floor(expressionHeight*1.4);

    return (
      <div>
        <div className='side-menu-h1'>
          Select a statistic
        </div>
        <Stage width={this.props.width} height={this.props.height}>
          <Layer>
            {BqlStudio.getExpressions().map((expression, index) => (
              <StyledExpression
                key={index}
                x={expressionX}
                y={verticalSpacing*(index+0.5)}
                width={expressionWidth}
                height={expressionHeight}
                expression={expression}
                wrap={SideMenuPane.wrap(expression)}
                onClick={()=>this.props.setExpression(expression)}
              />
              ))}
          </Layer>
        </Stage>
      </div>
    )
  }

  static getContexts() {
    return ['column1'];
  }

  static getOrderOptions() {
    return ['ASC', 'DESC'];
  }

  renderSideMenu() {
    let sideMenu;
    if (this.props.query instanceof EstimateQuery) {
      if (this.props.query.expressionChosen) {
        let statisticText = (
            <div className='side-menu-h1'>
              Statistic: {this.props.query.expressionName}
            </div>
        );
        // let statisticDropDown = (
        //   <UncontrolledDropdown>
        //     <DropdownToggle caret>
        //       {this.props.query.expression}
        //     </DropdownToggle>
        //     <DropdownMenu>
        //       {BqlStudio.getExpressions().map((expression, index) => (
        //         <DropdownItem key={index} onClick={() => {
        //           // make setExpression
        //           this.props.setExpression(expression);
        //         }}>
        //           {expression}
        //         </DropdownItem>
        //       ))}
        //     </DropdownMenu>
        //   </UncontrolledDropdown>
        // );

        let contextText = <div className='side-menu-h2'>Context:</div>;
        let context = '';
        if (this.props.query.contextChosen) {
          context = this.props.query.context;
        }
        let contextDropDown = (
          <UncontrolledDropdown>
            <DropdownToggle caret>
              {context}
            </DropdownToggle>
            <DropdownMenu>
              {SideMenuPane.getContexts().map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.setContext(columnName);
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        );

        let inputText = <div className='side-menu-h2'>Input:</div>;
        let input1Text = <div className='side-menu-h3'>First row:</div>;
        let row1;
        if (this.props.query.row1Chosen) {
          let input1Type;
          if (this.props.query.row1Fixed) {
            input1Type = <div>SINGLE ROW</div>;
            let row1Condition = '';
            if (this.props.query.row1ConditionChosen) {
              row1Condition = this.props.query.row1Condition;
            }
            let row1Input = (
              <div>
                <InputGroup className='row1Input' onChange={
                  evt=>{
                    this.setState({
                      row1BoolExpr: evt.target.value,
                    })
                  }
                }>
                  <Input defaultValue={row1Condition}/>
                </InputGroup>
                <Button onClick={
                  ()=>this.props.setRow1Condition(this.state.row1BoolExpr)
                }>
                  Update
                </Button>
              </div>
            );
            row1 = (
              <div>
                {input1Type}
                {row1Input}
              </div>
            )
          } else {
            input1Type = <div>EVERY ROW</div>;
            row1 = (
              <div>
                {input1Type}
              </div>
            )
          }
        } else {
          row1 = <RowChoice onClick={fixed => this.props.fixRow(1, fixed)}/>
        }

        let input2Text = <div className='side-menu-h3'>Second row:</div>;
        let row2;
        if (this.props.query.row2Chosen) {
          let input2Type;
          if (this.props.query.row2Fixed) {
            input2Type = <div>SINGLE ROW</div>;
            let row2Condition = '';
            if (this.props.query.row2ConditionChosen) {
              row2Condition = this.props.query.row2Condition;
            }
            //The single row that you are comparing against will be the first row of the table that matches the boolean
            //                 expression that you write here
            let row2Input = (
              <div>
                <InputGroup className='row2Input' onChange={
                  evt=>{
                    this.setState({
                      row2BoolExpr: evt.target.value,
                    })
                  }
                }>
                  <Input defaultValue={row2Condition}/>
                </InputGroup>
                <Button onClick={
                  ()=>this.props.setRow2Condition(this.state.row2BoolExpr)
                }>
                  Update
                </Button>
              </div>
            );
            row2 = (
              <div>
                {input2Type}
                {row2Input}
              </div>
            )
          } else {
            input2Type = <div>EVERY ROW</div>;
            row2 = (
              <div>
                {input2Type}
              </div>
            )
          }
        } else {
          row2 = <RowChoice onClick={fixed => this.props.fixRow(2, fixed)}/>
        }

        let optional;
        if (this.props.query.rowsComplete) {
          let orderBy;
          if (this.props.query.orderBySupported) {
            //Enter the new direction you would like to order the rows in.
            orderBy = (
              <div>
                <div className='side-menu-h2'>
                ORDER BY:
                </div>
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    {this.props.query.orderBy}
                  </DropdownToggle>
                  <DropdownMenu>
                    {SideMenuPane.getOrderOptions().map((order, index) => (
                      <DropdownItem key={index} onClick={() => {
                        this.setState({
                          orderChosen: order,
                        });
                        this.props.setOrderBy(order);
                      }}>
                        {order}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            );
          }

          let limit;
          if (this.props.query.limitSupported) {
            //Enter the new number of rows of results you would like returned.
            limit = (
              <div>
                <div className='side-menu-h2'>
                LIMIT:
                </div>
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
                  ()=> {
                    let limitReturn = (this.state.limitChosen !== '') ? this.state.limitChosen : this.props.query.limit;
                    this.props.setLimit(limitReturn);
                  }
                }>
                  Update
                </Button>
              </div>
            );
          }

          optional = (
            <div>
              {orderBy}
              {limit}
            </div>
          )
        }

        sideMenu = (
          <div>
            {statisticText}
            {contextText}
            {contextDropDown}
            {inputText}
            {input1Text}
            {row1}
            {input2Text}
            {row2}
            {optional}
          </div>
        );

        return sideMenu;
      } else {
        return this.renderChooseExpression();
      }
    }
  }

  // /**
  //  * Currently drop down is not linked to anything
  //  */
  // renderInTheContextOf() {
  //   //need text to show 'in the context of'
  //   //and a drop down menu to show column options
  //   //and an on click to update the query state
  //
  //   // get drop down options from schema
  //   // update current query state when new dropdown item clicked
  //
  //   let ddOptions = ['column1', 'column2'];
  //
  //   return (
  //     <div>
  //       In the context of:
  //       <UncontrolledDropdown>
  //         <DropdownToggle caret>
  //           {this.state.contextChosen}
  //         </DropdownToggle>
  //         <DropdownMenu>
  //           {ddOptions.map((columnName, index) => (
  //             <DropdownItem key={index} onClick={() => {
  //               this.setState({
  //                 contextChosen: columnName,
  //               });
  //               this.props.onClick(columnName);
  //             }}>
  //               {columnName}
  //             </DropdownItem>
  //           ))}
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   );
  // }
  //
  // renderRow1BoolExpr() {
  //   let rowBoolExpr = '';
  //   if (this.props.query.row1ConditionChosen) {
  //     rowBoolExpr = this.props.query.row1Condition;
  //   }
  //   return (
  //     <div>
  //       ROW 1
  //       <br/>
  //       The single row that you are comparing against will be the first row of the table that matches the boolean
  //       expression that you write here
  //       <InputGroup className='row1Input' onChange={
  //         evt=>{
  //           this.setState({
  //             row1BoolExpr: evt.target.value,
  //           })
  //         }
  //       }>
  //         <Input defaultValue={rowBoolExpr}/>
  //       </InputGroup>
  //       <Button onClick={
  //         ()=>this.props.onClick(this.state.row1BoolExpr)
  //       }>
  //         Update
  //       </Button>
  //     </div>
  //   )
  // }
  //
  // renderRow2BoolExpr() {
  //   let rowBoolExpr = '';
  //   if (this.props.query.row2ConditionChosen) {
  //     rowBoolExpr = this.props.query.row2Condition;
  //   }
  //   return (
  //     <div>
  //       ROW 2
  //       <br/>
  //       The single row that you are comparing against will be the first row of the table that matches the boolean
  //       expression that you write here
  //       <InputGroup className='row2Input' onChange={
  //         evt=>{
  //           this.setState({
  //             row2BoolExpr: evt.target.value,
  //           })
  //         }
  //       }>
  //         <Input defaultValue={rowBoolExpr}/>
  //       </InputGroup>
  //       <Button onClick={
  //         ()=>this.props.onClick(this.state.row2BoolExpr)
  //       }>
  //         Update
  //       </Button>
  //     </div>
  //   )
  // }
  //
  // renderOrderBy() {
  //   let orderOptions = ['ASC', 'DESC'];
  //   return (
  //     <div>
  //       ORDER BY:
  //       <br/>
  //       Enter the new direction you would like to order the rows in.
  //       <UncontrolledDropdown>
  //         <DropdownToggle caret>
  //           {this.props.query.orderBy}
  //         </DropdownToggle>
  //         <DropdownMenu>
  //           {orderOptions.map((order, index) => (
  //             <DropdownItem key={index} onClick={() => {
  //               this.setState({
  //                 orderChosen: order,
  //               });
  //               this.props.onClick(order);
  //             }}>
  //               {order}
  //             </DropdownItem>
  //           ))}
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   );
  // }
  //
  // renderLimit() {
  //   return (
  //     <div>
  //       LIMIT:
  //       <br/>
  //       Enter the new number of rows of results you would like returned.
  //       <InputGroup className='limitInput' onChange={
  //         evt=>{
  //           this.setState({
  //             limitChosen: evt.target.value,
  //           })
  //         }
  //       }>
  //         <Input type='number' step='1' defaultValue={this.props.query.limit}/>
  //       </InputGroup>
  //       <Button onClick={
  //         ()=>this.props.onClick(this.state.limitChosen)
  //       }>
  //         Update
  //       </Button>
  //     </div>
  //   )
  // }
  //
  // renderOptionPane(currentlySelected) {
  //   let optionPane;
  //
  //   switch (currentlySelected) {
  //     case 0:
  //       //empty
  //       optionPane = "";
  //       break;
  //     case 1:
  //       //expression select
  //       optionPane = this.renderChooseExpression();
  //       break;
  //     case 2:
  //       //in the context of
  //       optionPane = this.renderInTheContextOf();
  //       break;
  //     case 3:
  //       //render row1 boolExpr
  //       optionPane = this.renderRow1BoolExpr();
  //       break;
  //     case 4:
  //       //render order
  //       optionPane = this.renderOrderBy();
  //       break;
  //     case 5:
  //       //limit
  //       optionPane = this.renderLimit();
  //       break;
  //     case 6:
  //       //render row2 boolExpr
  //       optionPane = this.renderRow2BoolExpr();
  //       break;
  //     default:
  //       throw new UnsupportedSideMenuError(currentlySelected);
  //   }
  //
  //   return optionPane;
  // }

  render() {
    const divStyle = {
      height: this.props.height+'px',
      width: this.props.width+'px',
      backgroundColor: '#7EBAD9',
    };

    return (
      <div style={divStyle}>
        {this.renderSideMenu()}
      </div>
    );

  }
}

export default SideMenuPane;