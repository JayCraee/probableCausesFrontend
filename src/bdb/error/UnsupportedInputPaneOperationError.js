class UnsupportedInputPaneOperationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnsupportedInputPaneOperationError';
  }
}

export default UnsupportedInputPaneOperationError;