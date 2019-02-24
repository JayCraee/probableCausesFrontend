import React, {Component} from 'react';
import {Button, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, UncontrolledDropdown} from 'reactstrap';

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
    }
  }

  getAllColumns() {
    return ['columnA', 'columnB', 'columnC', 'columnD'];
  }

  getNominalColumns() {
    return ['columnB', 'columnD'];
  }

  static difference(A, B) {
    return A.filter(x => !B.includes(x));
  }

  renderConstraintRow(constraint, key) {
    return (
      <tr key={key} id='constraint'>
        <td id='constraint'>
          <UncontrolledDropdown>
            <DropdownToggle caret>
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
          <Button onClick={()=>(this.props.removeConstraint(key))}>
            -
          </Button>
        </td>
      </tr>
    );
  }

  renderAddConstraintButton() {
    return (
      <tr id='constraint'>
        <td id='constraint'>
          <Button onClick={()=>{this.setState({addingConstraint: true})}}>+</Button>
        </td>
      </tr>
    );
  }

  renderNewConstraint() {
    return (
      <tr id='constraint'>
        <td id='constraint'>
        <UncontrolledDropdown>
        <DropdownToggle caret>
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
        onClick={()=>{
          this.props.addConstraint(this.state.nextConstraintField, this.state.nextConstraintValue);
          this.setState({
            nextConstraintValue: '',
            nextConstraintField: '',
            addingConstraint: false,
          });
        }}
        >
        Add
        </Button>
    </td>
        <td>
          <Button onClick={() => {
            this.setState({
              nextConstraintValue: '',
              nextConstraintField: '',
              addingConstraint: false,
            });
          }}>
            Cancel
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
            <DropdownToggle caret>
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
          <Button onClick={()=>(this.props.removeFieldToSimulate(key))}>
            -
          </Button>
        </td>
      </tr>
    );
  }

  renderAddFieldButton() {
    return (
      <tr id='field-to-simulate'>
        <td id='field-to-simulate'>
          <Button onClick={()=>{this.setState({addingField: true})}}>+</Button>
        </td>
      </tr>
    );
  }

  renderAddField() {
    return (
      <tr id='field-to-simulate'>
        <td id='field-to-simulate'>
          <UncontrolledDropdown>
            <DropdownToggle caret/>
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
          <Button onClick={() => {
            this.setState({
              addingField: false,
            });
          }}>
            Cancel
          </Button>
        </td>
      </tr>
    );
  }

  renderConstraints() {
    let constraintsText = <div className='side-menu-h2'>Fields with known values:</div>;

    let nextConstraint = this.state.addingConstraint ? this.renderNewConstraint() : this.renderAddConstraintButton();

    //display constraints
    let constraints = (
      <table>
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
    let fieldsText = <div className='side-menu-h2'>Fields to be predicted:</div>;

    let nextField = this.state.addingField ? this.renderAddField() : this.renderAddFieldButton();

    let fields = (
      <table>
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
      backgroundColor: '#7EBAD9',
    };

    return this.renderSimulate(style);
  }
}

export default SimulatePane;