class UnsupportedExpressionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnsupportedExpressionError';
  }
}

export default UnsupportedExpressionError;