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

  //multi-use pass ons
  get dimensions() {
    return this._expression.dimensions;
  }

  //Pass ons to SimilarityExpression
  set context(column) {
    this._expression._context = column;
  }
  get context() {
    return this._expression._context;
  }
  get contextChosen() {
    return !(this._expression._context === undefined);
  }

  //getDimensions in multi-use

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

  //Pass ons to CorrelationExpression
  get col1Chosen() {
    return this._expression.getColChosen(1);
  }
  get col2Chosen() {
    return this._expression.getColChosen(2);
  }

  set col1Fixed(fixed) {
    return this._expression.setColFixed(1, fixed);
  }
  set col2Fixed(fixed) {
    return this._expression.setColFixed(2, fixed);
  }
  get col1Fixed() {
    return this._expression.getColFixed(1);
  }
  get col2Fixed() {
    return this._expression.getColFixed(2);
  }

  get col1NameChosen() {
    return this._expression.getColNameChosen(1);
  }
  get col2NameChosen() {
    return this._expression.getColNameChosen(2);
  }

  get colsComplete() {
    return this._expression.colsComplete;
  }

  set col1Name(name) {
    this._expression.setColName(1, name);
  }
  set col2Name(name) {
    this._expression.setColName(2, name);
  }

  get col1Name() {
    return this._expression.getColName(1);
  }
  get col2Name() {
    return this._expression.getColName(2);
  }
}

export default EstimateQuery;