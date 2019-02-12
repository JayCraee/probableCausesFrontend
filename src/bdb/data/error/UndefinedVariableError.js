class UndefinedVariableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UndefinedVariableError'
  }
}

export default UndefinedVariableError;