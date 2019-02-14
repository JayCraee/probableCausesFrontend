class UnsupportedDiagramClickError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnsupportedDiagramClickError';
  }
}

export default UnsupportedDiagramClickError;