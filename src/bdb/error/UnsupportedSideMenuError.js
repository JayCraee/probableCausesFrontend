class UnsupportedSideMenuError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnsupportedMenuError';
  }
}

export default UnsupportedSideMenuError;