class OptionNotSupportedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OptionNotSupportedError';
  }
}