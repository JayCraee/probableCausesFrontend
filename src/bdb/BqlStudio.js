import React, {Component} from 'react';
import {Button} from 'reactstrap';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";

class BqlStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: BqlStudio.getPopulation(),
      numQueries: 1,
    }
  }

  static getPopulation() {
    return "pop";
  }

  static getExpressions() {
    return ['SIMILARITY', 'CORRELATION'];
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.state.numQueries; ++i) {
      rows.push(<tr key={i}><td id='query'><QueryPane population={this.state.population}/></td></tr>)
    }
    rows.push(<tr key={this.state.numQueries}><td id='query'><Button onClick={()=>this.setState({numQueries: this.state.numQueries+1})}>+</Button></td></tr>);
    return (
      <table width="100%">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default withRouter(BqlStudio);