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
import SimilarityExpression from "./data/SimilarityExpression";
import CorrelationExpression from "./data/CorrelationExpression";
import ColChoice from "./ColChoice";
import SimulateQuery from "./data/SimulateQuery";

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
      nextConstraintField: '',
      nextConstraintValue: '',
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
    return ['columnA', 'columnB'];
  }

  static getNominalFields() {
    return ['nominal-column'];
  }

  static getOrderOptions() {
    return ['ASC', 'DESC'];
  }

  renderInput(
    inputChosen,
    inputFixed,
    inputConditionChosen,
    inputCondition,
    onChangeAction,
    fixAction,
    num,
    inputText
  ) {

    let input1Text = <div className='side-menu-h3'>{inputText}</div>;
    let input1;
    if (inputChosen()) {
      let input1Type;
      if (inputFixed()) {
        let row1Condition = '';
        if (inputConditionChosen()) {
          row1Condition = inputCondition();
        }
        let row1Input = (
          <div>
            <InputGroup className='row1Input' onChange={
              evt => {
                onChangeAction(evt.target.value)
              }
            }>
              <Input defaultValue={row1Condition}/>
            </InputGroup>
          </div>
        );

        let input1Table = (
          <table>
            <tbody>
            <tr>
              <td id='input-name'>
                {input1Text}
              </td>
              <td id='input-value'>
                {row1Input}
              </td>
            </tr>
            </tbody>
          </table>
        );

        input1 = inputConditionChosen() ? (
          <div>{input1Table}</div>
        ) : (
          <div className="todo">{input1Table}</div>
        );
      } else {
        input1Type = <div>Every Row</div>;
        input1 = (
          <table>
            <tbody>
            <tr>
              <td id='input-name'>
                {input1Text}
              </td>
              <td id='input-value'>
                {input1Type}
              </td>
            </tr>
            </tbody>
          </table>
        )
      }
    } else {
      input1 = (
        <div className='todo'>
          <table>
            <tbody>
            <tr>
              <td id='input-name'>
                {input1Text}
              </td>
            </tr>
            </tbody>
          </table>
          <RowChoice onClick={fixed => fixAction(num, fixed)}/>
        </div>
      )
    }

    return input1;
  }

  renderSimilarity(statisticText) {
    let processingText = <div className='side-menu-h2'>Processing:</div>
    let contextText = <div className='side-menu-h3'>Context:</div>;
    let context = '';
    if (this.props.query.contextChosen) {
      context = this.props.query.context;
    } else {
      context = 'add context';
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

    let contextTable = (
      <table>
        <tbody>
          <tr>
            <td id='input-name'>{contextText}</td>
            <td>{contextDropDown}</td>
          </tr>
        </tbody>
      </table>
    );
    let contextDiv = this.props.query.contextChosen ? (
      <div>
        {contextTable}
      </div>
    ) : (
      <div className='todo'>
        {contextTable}
      </div>
    );
    let processing = (
      <div className='side-menu-block'>
        <div className='processing'>
        {processingText}
        {contextDiv}
        </div>
      </div>
    );

    let inputText = <div className='side-menu-h2'>Input:</div>;
    let input1 = this.renderInput(
      ()=>{return this.props.query.row1Chosen},
      ()=>{return this.props.query.row1Fixed},
      ()=>{return this.props.query.row1ConditionChosen},
      ()=>{return this.props.query.row1Condition},
      this.props.setRow1Condition,
      this.props.fixRow,
      1,
      'First row:'
    );

    let input2 = this.renderInput(
      ()=>{return this.props.query.row2Chosen},
      ()=>{return this.props.query.row2Fixed},
      ()=>{return this.props.query.row2ConditionChosen},
      ()=>{return this.props.query.row2Condition},
      this.props.setRow2Condition,
      this.props.fixRow,
      2,
      'Second row:'
    );

    let inputDiv = (
      <div className='side-menu-block'>
        <div class="input">
          {inputText}
          {input1}
          {input2}
        </div>
      </div>
    );

    let output;
    let outputText = <div className='side-menu-h2'>Output</div>;
    if (this.props.query.rowsComplete) {
      let orderBy;
      if (this.props.query.orderBySupported) {
        //Enter the new direction you would like to order the rows in.
        orderBy = (
          <div>
            <div className='side-menu-h3'>
              Order by:
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
          <table>
            <tbody>
            <tr>
              <td id='input-name'>
                <div className='side-menu-h3'>
                  Limit:
                </div>
              </td>
              <td>
                <InputGroup className='limitInput' onChange={
                  evt => {
                    this.props.setLimit(evt.target.value)
                  }
                }>
                  <Input type='number' step='1' defaultValue={this.props.query.limit}/>
                </InputGroup>
              </td>
            </tr>
            </tbody>
          </table>
        );
      }

      output = (
        <div className='side-menu-block'>
          <div className='output'>
            {outputText}
            {orderBy}
            {limit}
          </div>
        </div>
      )
    }

    return (
      <div>
        {statisticText}
        {inputDiv}
        {processing}
        {output}
      </div>
    );
  }

  renderCorrelation(statisticText) {
    let inputText = <div className='side-menu-h2'>Input:</div>;
    let input1Text = <div className='side-menu-h3'>First column:</div>;
    let col1;
    if (this.props.query.col1Chosen) {
      let input1Type;
      if (this.props.query.col1Fixed) {
        input1Type = <div>SINGLE COLUMN</div>;
        let col1Name = '';
        if (this.props.query.col1NameChosen) {
          col1Name = this.props.query.col1Name;
        }
        let col1Input = (
          <UncontrolledDropdown>
            <DropdownToggle caret>
              {col1Name}
            </DropdownToggle>
            <DropdownMenu>
              {SideMenuPane.getContexts().map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.setColName(1, columnName);
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
        col1 = (
          <div>
            {input1Type}
            {col1Input}
          </div>
        )
      } else {
        input1Type = <div>EVERY COLUMN</div>;
        col1 = (
          <div>
            {input1Type}
          </div>
        )
      }
    } else {
      col1 = <ColChoice onClick={fixed => this.props.fixCol(1, fixed)}/>
    }
    let input2Text = <div className='side-menu-h3'>Second column:</div>;
    let col2;
    if (this.props.query.col2Chosen) {
      let input2Type;
      if (this.props.query.col2Fixed) {
        input2Type = <div>SINGLE COLUMN</div>;
        let col2Name = '';
        if (this.props.query.col2NameChosen) {
          col2Name = this.props.query.col2Name;
        }
        let col2Input = (
          <UncontrolledDropdown>
            <DropdownToggle caret>
              {col2Name}
            </DropdownToggle>
            <DropdownMenu>
              {SideMenuPane.getContexts().map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.setColName(2, columnName);
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
        col2 = (
          <div>
            {input2Type}
            {col2Input}
          </div>
        )
      } else {
        input2Type = <div>EVERY COLUMN</div>;
        col2 = (
          <div>
            {input2Type}
          </div>
        )
      }
    } else {
      col2 = <ColChoice onClick={fixed => this.props.fixCol(2, fixed)}/>
    }


    return (
      <div>
        {statisticText}
        {inputText}
        {input1Text}
        {col1}
        {input2Text}
        {col2}
      </div>
    )
  }

  renderSimulate() {
    let constraintsText = <div className='side-menu-h2'>Known facts about new row</div>;

    //display existing constraints
    let existingConstraints = (
      <div>
        {this.props.query.constraints.map((constraint, key)=>(
          //dropdown
          <div key={key}>
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {constraint.field}
              </DropdownToggle>
              <DropdownMenu>
                {SideMenuPane.getNominalFields().map((columnName, index) => (
                  <DropdownItem key={index} onClick={() => {
                    this.props.changeConstraint(key, columnName, constraint.value);
                  }}>
                    {columnName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            =
            <InputGroup onChange={
              evt => {
                this.props.changeConstraint(key, constraint.field, evt.target.value)
              }
            }>
              <Input id={"existing"+key} key={"existing"+key} defaultValue={constraint.value}/>
            </InputGroup>
          </div>
        ))}
      </div>
    );

    let nextConstraint = (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {this.state.nextConstraintField}
          </DropdownToggle>
          <DropdownMenu>
            {SideMenuPane.getContexts().map((columnName, index) => (
              <DropdownItem key={index} onClick={() => {
                this.setState({
                  nextConstraintField: columnName,
                })
              }}>
                {columnName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        =
        <Input id="not-the-same" key="not-the-same" value={this.state.nextConstraintValue} onChange={
          evt => {
            this.setState({
              nextConstraintValue: evt.target.value,
            })
          }}
          />
        <Button
          onClick={()=>{
            this.props.addConstraint(this.state.nextConstraintField, this.state.nextConstraintValue);
            this.setState({
              nextConstraintValue: '',
              nextConstraintField: '',
            });
          }}
        >
          Add
        </Button>
      </div>
    );

    let existingFieldsText = <div className='side-menu-h2'>Fields to be predicted</div>;
    let existingFields = (
      <div>
        {this.props.query.fieldsToSimulate.map((field, key)=>(
          <UncontrolledDropdown key={key}>
            <DropdownToggle caret>
              {field}
            </DropdownToggle>
            <DropdownMenu>
              {SideMenuPane.getNominalFields().map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.changeFieldToSimulate(key, columnName);
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        ))}
      </div>
    );

    let nextField = (
      <div>
        Add new:
        <UncontrolledDropdown>
          <DropdownToggle caret/>
          <DropdownMenu>
            {SideMenuPane.getNominalFields().map((columnName, index) => (
              <DropdownItem key={index} onClick={() => {
                this.props.addFieldToSimulate(columnName);
              }}>
                {columnName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );

    let simulateSideMenu = (
      <div>
        {constraintsText}
        {existingConstraints}
        {nextConstraint}
        {existingFieldsText}
        {existingFields}
        {nextField}
      </div>
    );

    return simulateSideMenu;
  }

  renderSideMenu() {
    if (this.props.query instanceof EstimateQuery) {
      let sideMenu;
      if (this.props.query.expressionChosen) {
        let statisticText = (
            <div className='side-menu-h1'>
              Statistic: {this.props.query.expressionName}
            </div>
        );

        if (this.props.query.expression instanceof SimilarityExpression) {
          sideMenu = this.renderSimilarity(statisticText);
        } else if (this.props.query.expression instanceof CorrelationExpression) {
          sideMenu = this.renderCorrelation(statisticText);
        }
        return sideMenu;
      } else {
        return this.renderChooseExpression();
      }
    } else if (this.props.query instanceof SimulateQuery) {
      return this.renderSimulate();
    }
  }

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