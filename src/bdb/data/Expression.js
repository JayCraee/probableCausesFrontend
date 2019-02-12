class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  set expression(expression) {
    this._expression = expression;
  }
  get expression() {
    return this._expression;
  }
}

export default Expression;