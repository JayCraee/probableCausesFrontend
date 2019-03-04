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
} from 'reactstrap';
import RowChoice from "./RowChoice";
import BqlStudio from "./BqlStudio";
import SimilarityExpression from "./data/SimilarityExpression";
import CorrelationExpression from "./data/CorrelationExpression";
import ColChoice from "./ColChoice";
import { goToAnchor } from 'react-scrollable-anchor';

/**
 * Side Menu of the input pane
 * Will show different things depending on which shape is clicked on the diagram
 * Need to get the currently selected field from parent
 */
class SideMenuPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allColumns: this.getAllColumns(),
      nominalColumns: this.getNominalColumns(),
      contextChosen: '',
      limitChosen: '',
      orderChosen: '',
      row1BoolExpr: '',
      row2BoolExpr: '',
    };
  }

  getAllColumns() {
    return this.props.columns;
  }

  getNominalColumns() {
    return ['columnB'];
  }

  static wrap(expression) {
    return (String(expression).split(" ").length > 1);
  }

  handleExpressionChoice(expression) {
    this.props.setExpression(expression);
    goToAnchor('input'+(this.props.queryID+1));
  }

  renderChooseExpression() {
    let parentWidth = this.props.width;
    let expressionXOffsetScale = 0.1;
    let expressionHeight = 60;
    let expressionWidth = (1-2*expressionXOffsetScale) * parentWidth;

    let expressionX = expressionXOffsetScale * parentWidth;
    let verticalSpacing = Math.floor(expressionHeight*1.4);

    return (
      <div>
        <table>
          <header className='side-menu-h1'>
            Select statistical method
          </header>
          <tbody>
            <tr height= "50px"/>
            <tr>
              <div className='side-menu-h2'> <i> Similarity - Select rows, compare them in some context, <br/> <tab/>explore how similar they are.</i></div>
            </tr>
            <tr height= "20px"></tr>
            <tr>
              <div className='side-menu-h2'> <i> Correlation - Select columns, compare them, <br/> <tab/>explore any correlation they have.</i></div>
            </tr>
            <tr height= "50px"></tr>
          </tbody>
        </table>
         <Stage width={this.props.width} height={this.props.height}>
          <Layer>
            {BqlStudio.getExpressions().map((expression, index) => (
              <StyledExpression
                key={index}
                x={expressionX}
                y={verticalSpacing*(index+0.2)}
                width={expressionWidth}
                height={expressionHeight}
                expression={expression}
                wrap={SideMenuPane.wrap(expression)}
                onClick={()=>this.handleExpressionChoice(expression)}
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

  renderRowInput(
    inputChosen,
    inputFixed,
    inputConditionChosen,
    inputCondition,
    onChangeAction,
    fixAction,
    num,
    inputText
  ) {
    let input = (()=> {
      let row1Condition = '';
      if (inputConditionChosen()) {
        row1Condition = inputCondition();
      }

      return (
        <div>
          <InputGroup className='row1Input' onChange={
            evt => {
              onChangeAction(evt.target.value)
            }
          }>
            <Input defaultValue={row1Condition}/>
          </InputGroup>
        </div>
      )});

    let choice = <RowChoice onClick={fixed => fixAction(num, fixed)}/>;
    let every = 'Every Row';

    return this.renderInput(
      inputChosen,
      inputFixed,
      inputConditionChosen,
      inputCondition,
      input,
      inputText,
      choice,
      every
    )
  }

  renderColumnInput (
      inputChosen,
      inputFixed,
      inputConditionChosen,
      inputCondition,
      onChangeAction,
      fixAction,
      num,
      inputText
    ) 
    {
      let input = () => {
        let col1Name = '';
        if (inputConditionChosen()) {
          col1Name = inputCondition();
        }

        return (<UncontrolledDropdown>
          <DropdownToggle color="light" caret>
            {col1Name}
          </DropdownToggle>
          <DropdownMenu>
            {this.state.allColumns.map((columnName, index) => (
              <DropdownItem key={index} onClick={() => {
                onChangeAction(num, columnName);
                }}>
                {columnName}
              </DropdownItem>
            ))}
          </DropdownMenu>
          </UncontrolledDropdown>
        );
      };

      let choice = <ColChoice onClick={fixed => fixAction(num, fixed)}/>;
      let every = 'Every Column';

      return this.renderInput(
        inputChosen,
        inputFixed,
        inputConditionChosen,
        inputCondition,
        input,
        inputText,
        choice,
        every
      );
  }

  renderInput(
    inputChosen,
    inputFixed,
    inputConditionChosen,
    inputCondition,
    input,
    inputText,
    choice,
    every
  ) {

    let input1Text = <div className='side-menu-h3'>{inputText}</div>;
    let input1;
    if (inputChosen()) {
      let input1Type;
      if (inputFixed()) {
        let row1Input = input();

        let input1Table = (
          <table>
            <tbody>
            <tr>
              <td>
                {input1Text}
              </td>
              <td>
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
        input1Type = <div>{every}</div>;
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
              <td>{choice}</td>
            </tr>
            </tbody>
          </table>
        </div>
      )
    }

    return input1;
  }

  renderEstimate(statisticText, input, processing, output, explanation) {
    let inputDiv = (input !== undefined) ? (
      <div className='side-menu-block'>
        {input}
      </div>
    ) : undefined;
    let processingDiv = (processing !== undefined) ? (
      <div className='side-menu-block'>
        {processing}
      </div>
    ) : undefined;
    let outputDiv = (output !== undefined) ? (
      <div className='side-menu-block'>
        {output}
      </div>
    ) : undefined;
    let explanationDiv = (explanation !== undefined) ? (
      <div className='side-menu-block'>
        {explanation}
      </div>
    ) : undefined;
    return (
      <table>
        <tbody>
          <tr> {statisticText} </tr>
          <tr height="15px"/>
          <tr> {inputDiv} </tr>
          <tr height="10px"/>
          <tr> {processingDiv}  </tr>
          <tr height="10px"/>
          <tr> {outputDiv} </tr>
          <tr height="15px"/>
          <tr> {explanationDiv}</tr>
        </tbody>
      </table>
    );
  }

  renderSimilarity(statisticText) {
    let inputText = 
      <div className='side-menu-h2'>(1) Choose to compare one or every row.  <br/>
        <div className='side-menu-h4'>
          <i>To choose a specific row you need to input a boolean expression (e.g. ID=1) and the first row to match this expression will be used.</i>
        </div>
        (2) Choose to compare it with one or every row. <br/>
        (3) Choose a column for the context <br/>
        (4) Click <button style={{backgroundColor: "#2ec077", borderRadius: "6px"}}>Run</button> and the results will be displayed below. <br/>
      </div>

      let input1 = this.renderRowInput(
      ()=>{return this.props.query.row1Chosen},
      ()=>{return this.props.query.row1Fixed},
      ()=>{return this.props.query.row1ConditionChosen},
      ()=>{return this.props.query.row1Condition},
      this.props.setRow1Condition,
      this.props.fixRow,
      1,
      'Compare:'
    );

    let input2 = this.renderRowInput(
      ()=>{return this.props.query.row2Chosen},
      ()=>{return this.props.query.row2Fixed},
      ()=>{return this.props.query.row2ConditionChosen},
      ()=>{return this.props.query.row2Condition},
      this.props.setRow2Condition,
      this.props.fixRow,
      2,
      'With:'
    );

    let input = (
      <table className="input">
        <tbody>
          <tr>
            {inputText}
          </tr>
          <tr height="30px"/>
          <tr>
            {input1}
          </tr>
          <tr height="10px"/>
          <tr>
            {input2}
          </tr>
        </tbody>
      </table>
    );

    let contextText = <div className='side-menu-h3'>Context:</div>;
    let context = '';
    if (this.props.query.contextChosen) {
      context = this.props.query.context;
    } else {
      context = 'Add context:';
    }
    let contextDropDown = (
      <UncontrolledDropdown>
        <DropdownToggle color="light" caret>
          {context}
        </DropdownToggle>
        <DropdownMenu>
          {this.state.allColumns.map((columnName, index) => (
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
      <div align="center" >
        {contextTable}
      </div>
    )
    :(
      <div className='todo'>
        {contextTable}
      </div>
    );
    let processing = (
      <table className='processing'>
        <tr align="center" >
        {contextDiv}
        </tr>
      </table>
    );

    let output;
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
              <DropdownToggle color="light" caret>
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
            <tr align="center" >
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
        <div className='output'>
          {orderBy}
          {limit}
        </div>
      )
    }

    let explanation =
      <div className='side-menu-h4'>
        <i>Similarity between 2 rows will return a real number, expressing how similar they are in the context of a column on a scale from 0 to 1.</i>
      </div>
    
    return this.renderEstimate(statisticText, input, processing, output, explanation);
  }

  renderCorrelation(statisticText) {
    let inputText = 
      <div className='side-menu-h2'>
        1. Choose to compare one or every column. <br/>
        2. Choose to compare it with one or every column. <br/>
        3. Click <button style={{backgroundColor: "#2ec077", borderRadius: "6px"}}>Run</button> and the results will be displayed below. <br/><br/>
      </div>  

                
                                                  
    let col1 = this.renderColumnInput(
      ()=>{return this.props.query.col1Chosen},
      ()=>{return this.props.query.col1Fixed},
      ()=>{return this.props.query.col1NameChosen},
      ()=>{return this.props.query.col1Name},
      this.props.setColName,
      this.props.fixCol,
      1,
      'Compare:'
    );

    let col2 = this.renderColumnInput(
      ()=>{return this.props.query.col2Chosen},
      ()=>{return this.props.query.col2Fixed},
      ()=>{return this.props.query.col2NameChosen},
      ()=>{return this.props.query.col2Name},
      this.props.setColName,
      this.props.fixCol,
      2,
      'With:'
    );

    let input = (
      <table>
      <tbody>
      <tr>
          {inputText}
        </tr>
        <tr height="50px"/>
        <tr>
          {col1}
        </tr>
        <tr height="30px"/>
        <tr>
          {col2}
        </tr>
      </tbody>
    </table>
    );

    let explanation = 
      <div className='side-menu-h4'>
        <i>
          Correlation between 2 columns will return a real number, expressing how much they correlate on a scale from 0 to 1.
        </i>
      </div>

    return this.renderEstimate(statisticText, input, undefined, undefined, explanation);
  }

  renderSideMenu() {
    let sideMenu;
    if (this.props.query.expressionChosen) {
      let statisticText = (
        <div className='side-menu-h1'>
          {this.props.query.expression instanceof CorrelationExpression ? 
            "Correlation between columns" : 
            this.props.query.expression instanceof SimilarityExpression ?
            "Similarity between rows" : "Unsupported query type"}
        </div>
      );

      if (this.props.query.expression instanceof SimilarityExpression) {
        sideMenu = this.renderSimilarity(statisticText);
      } else if (this.props.query.expression instanceof CorrelationExpression) {
        sideMenu = this.renderCorrelation(statisticText);
      }
      return sideMenu;
    } else {
      return this.renderChooseExpression()
    }
  }

  render() {
    const divStyle = {
      height: this.props.height+'px',
      width: this.props.width+'px',
      backgroundColor: '#1c6ca1',
    };

    return (
      <div style={divStyle}>
        {this.renderSideMenu()}
      </div>
    );

  }

}

export default SideMenuPane;