class UnsupportedQueryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnsupportedQueryError';
  }
}

export default UnsupportedQueryError;