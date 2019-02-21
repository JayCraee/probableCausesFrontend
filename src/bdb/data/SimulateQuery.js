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

  addNewFieldToSimulate(field) {
    this._fieldsToSimulate.push(field);
  }

  get fieldsToSimulate() {
    return this._fieldsToSimulate.slice();
  }
}