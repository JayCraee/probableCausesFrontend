import Query from "./Query";

class SimulateQuery extends Query {
  constructor() {
    super('SIMULATE');
    this._constraints=[];
    this._fieldsToSimulate=[];
  }

  addNewConstraint(field, value) {
    this._constraints.push(
      {
        field: field,
        value: value,
      }
    );
  }

  get constraints() {
    return this._constraints.slice();
  }

  get constraintsFields() {
    return this._constraints.map((constraint)=>(
      constraint.field
    ));
  }

  addNewFieldToSimulate(field) {
    this._fieldsToSimulate.push(field);
  }

  get fieldsToSimulate() {
    return this._fieldsToSimulate.slice();
  }

  changeConstraint(index, field, value) {
    this._constraints[index].field = field;
    this._constraints[index].value = value;
  }

  changeFieldToSimulate(index, field) {
    this._fieldsToSimulate[index] = field;
  }

  get constraintsComplete() {
    return (this._constraints.length > 0);
  }

  get fieldsToSimulateComplete() {
    return (this._fieldsToSimulate.length > 0);
  }

  get simulateQueryComplete() {
    return (this.fieldsToSimulateComplete && this.constraintsComplete);
  }

  removeConstraint(index) {
    this._constraints.splice(index, 1);
  }

  removeFieldToSimulate(index) {
    this._fieldsToSimulate.splice(index, 1);
  }
}

export default SimulateQuery;