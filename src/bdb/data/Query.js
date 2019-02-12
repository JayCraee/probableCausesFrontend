class Query {
  constructor(query) {
    this.query = query;
  }

  set query(query) {
    this._query = query;
  }
  get query() {
    return this._query;
  }
}