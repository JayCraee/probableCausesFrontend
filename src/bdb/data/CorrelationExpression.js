import Expression from "./Expression";
import ColumnDimension from "./ColumnDimension";

class CorrelationExpression extends Expression{
  constructor() {
    super('CORRELATION');

    this._dimension = new ColumnDimension();
  }

  get dimensions() {
    return this._dimension.dimensions;
  }

  getColChosen(num) {
    return this._dimension.getColChosen(num);
  }

  setColFixed(num, fixed) {
    this._dimension.setColFixed(num, fixed);
  }
  getColFixed(num) {
    return this._dimension.getColFixed(num);
  }

  getColNameChosen(num) {
    return this._dimension.getColNameChosen(num);
  }

  get colsComplete() {
    return this._dimension.colsComplete;
  }

  setColName(num, name) {
    this._dimension.setColName(num, name);
  }
  getColName(num) {
    return this._dimension.getColName(num);
  }
}

export default CorrelationExpression;