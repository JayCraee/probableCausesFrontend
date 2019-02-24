import React, {Component} from 'react';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem, InputGroup, Input, Button} from 'reactstrap';

class SimulatePane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allColumns: this.getAllColumns(),
      nominalColumns: this.getNominalColumns(),
      nextConstraintField: '',
      nextConstraintValue: '',
    }
  }

  getAllColumns() {
    return ['columnA', ['columnB']];
  }

  getNominalColumns() {
    return ['columnB'];
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
                {this.state.nominalColumns.map((columnName, index) => (
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
            {this.state.allColumns.map((columnName, index) => (
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
              {this.state.nominalColumns.map((columnName, index) => (
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
            {this.state.nominalColumns.map((columnName, index) => (
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

  render() {
    return this.renderSimulate();
  }
}

export default SimulatePane;