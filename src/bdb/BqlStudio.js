import React, {Component} from 'react';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";

class BqlStudio extends Component {

  static getExpressions() {
    return ['SIMILARITY'];
  }

  render() {
    return (
      <QueryPane/>
    );
  }
}

export default withRouter(BqlStudio);