import React, {Component} from 'react';
import {Button, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, UncontrolledDropdown} from 'reactstrap';
import {  } from 'react-bootstrap';


class SimulatePane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allColumns: this.getAllColumns(),
      nominalColumns: this.getNominalColumns(),
      addingConstraint: false,
      addingField: false,
      nextConstraintField: '',
      nextConstraintValue: '',
      addButtonColor: "#2ec077",
      deleteButtonColor: "#701f2a"
    }
  }

  getAllColumns() {
    return this.props.columns;
  }

  getNominalColumns() {
    return this.props.nominalColumns;
  }

  static difference(A, B) {
    return A.filter(x => !B.includes(x));
  }

  renderConstraintRow(constraint, key) {
    return (
      <tr key={key} id='constraint'>
        <td id='constraint'>
          <UncontrolledDropdown >
            <DropdownToggle color="light" caret>
              {constraint.field}
            </DropdownToggle>
            <DropdownMenu>
              {SimulatePane.difference(this.state.allColumns, this.props.query.constraintsFields).map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.changeConstraint(key, columnName, constraint.value);
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
        <td id='constraint'>
          =
        </td>
        <td id='constraint'>
          <InputGroup onChange={
            evt => {
              this.props.changeConstraint(key, constraint.field, evt.target.value)
            }
          }>
            <Input id={"existing"+key} key={"existing"+key} defaultValue={constraint.value}/>
          </InputGroup>
        </td>
        <td id='constraint'>
          <Button style={{backgroundColor: this.state.deleteButtonColor}} onClick={()=>(this.props.removeConstraint(key))}>
            X
          </Button>
        </td>
      </tr>
    );
  }

  renderAddConstraintButton() {
    return (
      <tr id='constraint'>
        <td id='constraint'>
          <Button style={{backgroundColor: this.state.addButtonColor}} onClick={()=>{this.setState({addingConstraint: true})}}>
          +
          </Button>
        </td>
      </tr>
    );
  }

  renderNewConstraint() {
    return (
      <tr id='constraint'>
        <td id='constraint'>
        <UncontrolledDropdown>
        <DropdownToggle color="light" caret>
        {this.state.nextConstraintField}
        </DropdownToggle>
        <DropdownMenu>
        {SimulatePane.difference(this.state.allColumns, this.props.query.constraintsFields).map((columnName, index) => (
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
    </td>
    <td id='constraint'>
        =
    </td>
    <td id='constraint'>
        <Input id="not-the-same" key="not-the-same" value={this.state.nextConstraintValue} onChange={
          evt => {
            this.setState({
              nextConstraintValue: evt.target.value,
            })
          }}
        />
    </td>
    <td id='constraint'>
        <Button 
          style={{backgroundColor: this.state.addButtonColor}}
          onClick={()=>{
            this.props.addConstraint(this.state.nextConstraintField, this.state.nextConstraintValue);
            this.setState({
              nextConstraintValue: '',
              nextConstraintField: '',
              addingConstraint: false,
            });
          }}
          >
          +
        </Button>
    </td>
        <td>
          <Button 
            style={{backgroundColor: this.state.deleteButtonColor}}
            onClick={() => {
            this.setState({
              nextConstraintValue: '',
              nextConstraintField: '',
              addingConstraint: false,
            });
          }}>
            X
          </Button>
        </td>
    </tr>
    );
  }

  renderFieldToSimulate(field, key) {
    return (
      <tr key={key} id='field-to-simulate'>
        <td id='field-to-simulate'>
          <UncontrolledDropdown key={key}>
            <DropdownToggle color="light" caret>
              {field}
            </DropdownToggle>
            <DropdownMenu>
              {SimulatePane.difference(this.state.nominalColumns, this.props.query.fieldsToSimulate).map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.changeFieldToSimulate(key, columnName);
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
        <td id='field-to-simulate'>
          <Button style={{backgroundColor: this.state.deleteButtonColor}} onClick={()=>(this.props.removeFieldToSimulate(key))}>
            X
          </Button>
        </td>
      </tr>
    );
  }

  renderAddFieldButton() {
    return (
      <tr id='field-to-simulate'>
        <td id='field-to-simulate'>
          <Button style={{backgroundColor: this.state.addButtonColor}} onClick={()=>{this.setState({addingField: true})}}>+</Button>
        </td>
      </tr>
    );
  }

  renderAddField() {
    return (
      <tr id='field-to-simulate'>
        <td id='field-to-simulate'>
          <UncontrolledDropdown>
            <DropdownToggle color="light" caret/>
            <DropdownMenu>
              {SimulatePane.difference(this.state.nominalColumns, this.props.query.fieldsToSimulate).map((columnName, index) => (
                <DropdownItem key={index} onClick={() => {
                  this.props.addFieldToSimulate(columnName);
                  this.setState({
                    addingField: false,
                  });
                }}>
                  {columnName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
        <td id='field-to-simulate'>
          <Button 
            style={{backgroundColor: this.state.deleteButtonColor}}
            onClick={() => {
              this.setState({
                addingField: false,
              });
            }}
          >
            X
          </Button>
        </td>
      </tr>
    );
  }

  renderConstraints() {
    let constraintsText = <div className='simulate-h2'>Fields with known values:</div>;

    let nextConstraint = this.state.addingConstraint ? this.renderNewConstraint() : this.renderAddConstraintButton();

    //display constraints
    let constraints = (
      <table id='simulate-pane'>
        <tbody>
        {this.props.query.constraints.map((constraint, key)=>(
          //dropdown
          this.renderConstraintRow(constraint, key)
        ))}
        {nextConstraint}
        </tbody>
      </table>
    );

    return (
      <div className='constraints'>
        {constraintsText}
        {constraints}
      </div>
    );
  }

  renderFieldsToSimulate() {
    let fieldsText = <div className='simulate-h2'>Fields to be predicted:</div>;

    let nextField = this.state.addingField ? this.renderAddField() : this.renderAddFieldButton();

    let fields = (
      <table id='simulate-pane'>
        <tbody>
        {this.props.query.fieldsToSimulate.map((field, key)=>(
          this.renderFieldToSimulate(field, key)
        ))}
        {nextField}
        </tbody>
      </table>
    );

    return (
      <div className='fieldsToSimulate'>
        {fieldsText}
        {fields}
      </div>
    )
  }

  renderSimulate(style) {
    let heading = <div className='side-menu-h1'>New entity</div>
    let constraints = this.renderConstraints();
    let fieldsToSimulate = this.renderFieldsToSimulate();
    return (
      <div style={style}>
        {heading}
        {constraints}
        {fieldsToSimulate}
      </div>
    );
  }

  render() {
    let style = {
      width: this.props.width,
      height: this.props.height,
      backgroundColor: '#1c6ca1',
      //backgroundColor: '#81ADDC',
    };

    return this.renderSimulate(style);
  }
}

export default SimulatePane;