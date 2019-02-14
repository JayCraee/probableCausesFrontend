import RowDimension from "./RowDimension";
import Expression from "./Expression";

class SimilarityExpression extends Expression {
  constructor() {
    super('SIMILARITY');

    //assume free until otherwise
    this._dimension = new RowDimension();
  }

  set context(column) {
    this._context = column;
  }
  get context() {
    return this._context;
  }
  get contextChosen() {
    return !(this._context === undefined);
  }

  get dimensions() {
    return this._dimension.dimensions;
  }

  set row1Fixed(fixed) {
    this._dimension.row1Fixed = fixed;
  }
  set row2Fixed(fixed) {
    this._dimension.row2Fixed = fixed;
  }

  get row1Chosen() {
    return this._dimension.row1Chosen;
  }
  get row2Chosen() {
    return this._dimension.row2Chosen;
  }
  get rowsComplete() {
    return (this.row1Chosen && (!this.row1Fixed || this.row1ConditionChosen) && this.row2Chosen && (!this.row2Fixed || this.row2ConditionChosen));
  }

  get row1ConditionChosen() {
    return this._dimension.row1ConditionChosen;
  }
  get row2ConditionChosen() {
    return this._dimension.row2ConditionChosen;
  }
  get row1Fixed() {
    return this._dimension.row1Fixed;
  }
  get row2Fixed() {
    return this._dimension.row2Fixed;
  }

  set row1Condition(condition) {
    this._dimension.row1Condition = condition;
  }
  set row2Condition(condition) {
    this._dimension.row2Condition = condition;
  }
  get row1Condition() {
    return this._dimension.row1Condition;
  }
  get row2Condition() {
    return this._dimension.row2Condition
  }

  set orderBy(orderBy) {
    this._dimension.orderBy = orderBy;
  }
  get orderBy() {
    return this._dimension.orderBy;
  }
  get orderBySupported() {
    return this._dimension.orderBySupported;
  }

  set limit(limit) {
    this._dimension.limit = limit;
  }
  get limit() {
    return this._dimension.limit;
  }
  get limitSupported() {
    return this._dimension.limitSupported;
  }
}

export default SimilarityExpression;