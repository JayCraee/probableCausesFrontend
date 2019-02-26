import React, {Component} from 'react';
import {Button} from 'reactstrap';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";

class BqlStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: undefined,
      columns: undefined,
      numQueries: 1,
    };
    this.getTableData();
  }

  async getTableData() {
    let populationsArr = await (await fetch("util/tableNames")).json();
    let population = populationsArr[0];

    let columns = await (await fetch("util/columnNames/"+population)).json();

    this.setState({
      population: population,
      columns: columns,
    })
  }

  static getExpressions() {
    return ['SIMILARITY', 'CORRELATION'];
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.state.numQueries; ++i) {
      rows.push(
        <tr key={i}>
          <td id='query'>
            <QueryPane
              population={this.state.population}
              columns={this.state.columns}
            />
          </td>
        </tr>
      );
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