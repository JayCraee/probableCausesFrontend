import React, {Component} from 'react';
import {Button} from 'reactstrap';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";
import BQLNavBar from './BQLNavBar';

class BqlStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: undefined,
      columns: undefined,
      nominalColumns: undefined,
      numQueries: 1,
    };
    this.getTableData();
  }

  async getTableData() {
    let populationsArr = await (await fetch("util/tableNames")).json();
    let population = populationsArr[0];

    let columns = await (await fetch("util/columnNames/"+population)).json();
    let nominalColumns = await (await fetch("/util/nominalColumnNames/"+population)).json();

    this.setState({
      population: population,
      columns: columns,
      nominalColumns: nominalColumns,
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
              nominalColumns={this.state.nominalColumns}
            />
          </td>
        </tr>
      );
      rows.push(<tr height="20px"/>);
    }
    rows.push(<tr key={this.state.numQueries}><td id='query'><Button onClick={()=>this.setState({numQueries: this.state.numQueries+1})}>+</Button></td></tr>);
    return (
      <div>
        <BQLNavBar/>
        <table width="100%">
          <header>
            <tr height="30px"/>
            <tr>
              <td width="15%"/>
              <td>
                <p id='welcome-title-big'>Welcome to BQL Studio</p>
                <p id='welcome-title-small'>Data analysis tool that uses MIT's BayesDB to deliver powerful data science capabilities to a wide user base. </p> 
                <p align="center">BayesDB uses advanced machine learning and statistical methods to make it easy for you to turn data into real world results. In BQL Studio, you can test and improve the reliability of your data-set, extract insight from it, and find out what would happen in the real world if you made changes to policy. Main functionalities of BQL Studio:</p> 
              <table>
                  <header>
                    <tr height="10px"/>
                    <tr>
                      <td width="200px"><p id='title-text'><b>EXPLORE SIMILARITY</b></p></td>
                      <td width="5px"/>
                      <td><p id='normal-text'>Helps you to find exceptional datapoints and analyse them or remove them from your data-set.</p> </td>
                    </tr>
                    <tr>
                      <td><p id='title-text'><b>EXPLORE CORRELATION</b></p></td>
                      <td width="5px"/>
                      <td><p id='normal-text'>Helps you to find patterns and trends that you may or may not have expected.</p> </td>
                    </tr>
                    <tr>
                      <td><p id='title-text'><b>TEST or SIMULATE</b></p></td>
                      <td width="5px"/>
                      <td><p id='normal-text'>Helps you to predict what effects a policy change would have if implemented in the real world.</p> </td>
                    </tr>
                  </header>
                </table>
              </td>
              <td width="15%"/>
            </tr>
            <tr height="20px"/>
          </header>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(BqlStudio);