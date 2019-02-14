import Query from './Query';
import OverwriteError from './error/OverwriteError';
import UndefinedVariableError from './error/UndefinedVariableError';

class EstimateQuery extends Query {
  constructor() {
    super('ESTIMATE');
  }

  set expression(expression) {
    if (this._expression === undefined) {
      this._expression = expression;
    } else {
      throw new OverwriteError('expression');
    }
  }
  get expression() {
    if (this._expression === undefined) {
      throw new UndefinedVariableError('expression');
    } else {
      return this._expression;
    }
  }
  get expressionName() {
    return this._expression.expression;
  }
  get expressionChosen() {
    return !(this._expression === undefined);
  }

  //Pass ons
  set context(column) {
    this._expression._context = column;
  }
  get context() {
    return this._expression._context;
  }
  get contextChosen() {
    return !(this._expression._context === undefined);
  }

  get dimensions() {
    return this._expression.dimensions;
  }

  set row1Fixed(fixed) {
    this._expression.row1Fixed = fixed;
  }
  set row2Fixed(fixed) {
    this._expression.row2Fixed = fixed;
  }

  get row1Chosen() {
    return this._expression.row1Chosen;
  }
  get row2Chosen() {
    return this._expression.row2Chosen;
  }
  get rowsComplete() {
    return this._expression.rowsComplete;
  }

  get row1Fixed() {
    return this._expression.row1Fixed;
  }
  get row2Fixed() {
    return this._expression.row2Fixed;
  }

  get row1ConditionChosen() {
    return this._expression.row1ConditionChosen;
  }
  get row2ConditionChosen() {
    return this._expression.row2ConditionChosen;
  }
  set row1Condition(condition) {
    this._expression.row1Condition = condition;
  }
  set row2Condition(condition) {
    this._expression.row2Condition = condition;
  }
  get row1Condition() {
    return this._expression.row1Condition;
  }
  get row2Condition() {
    return this._expression.row2Condition
  }

  set orderBy(orderBy) {
    this._expression.orderBy = orderBy;
  }
  get orderBy() {
    return this._expression.orderBy;
  }
  get orderBySupported() {
    return this._expression.orderBySupported;
  }

  set limit(limit) {
    this._expression.limit = limit;
  }
  get limit() {
    return this._expression.limit;
  }
  get limitSupported() {
    return this._expression.limitSupported;
  }
}

export default EstimateQuery;