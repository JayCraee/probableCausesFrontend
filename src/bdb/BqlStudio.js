import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {GridLoader} from 'react-spinners';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";
import BQLNavBar from './BQLNavBar';
import { Image } from 'react-bootstrap';

class BqlStudio extends Component {
  constructor(props) {
    super(props);

    let test = false;
    if (!test) {
      this.state = {
        population: undefined,
        columns: undefined,
        nominalColumns: undefined,
        loading: true,
        numQueries: 1,
        test: false,
      };
      this.getTableData();
    } else {
      this.state = {
        population: 'pop',
        columns: ['speed', 'injury', 'vehicle', 'fatality', 'area', 'city', 'people_involved'],
        nominalColumns: ['speed', 'injury', 'vehicle', 'fatality', 'area', 'city', 'people_involved'],
        loading: false,
        numQueries: 1,
        test: true,
      };
    }

  }

  async getTableData() {
    let populationsArr = await (await fetch("util/tableNames")).json();
    let population = populationsArr[0];

    let columns = await (await fetch("util/columnNamesPop/"+population)).json();
    let nominalColumns = await (await fetch("/util/columnNamesPop/"+population)).json();

    this.setState({
      population: population,
      columns: columns,
      nominalColumns: nominalColumns,
      loading: false
    })
  }

  static getExpressions() {
    return ['SIMILARITY', 'CORRELATION'];
  }

  render() {
    if (this.state.loading) {
      return <div><GridLoader
        loading={true}
      />
      loading...
      </div>
    } else {
      let rows = [];
      for (let i = 0; i < this.state.numQueries; ++i) {
        rows.push(
          <tr key={i}>
            <td id='query'>
              <QueryPane
                population={this.state.population}
                columns={this.state.columns}
                nominalColumns={this.state.nominalColumns}
                test={this.state.test}
              />
            </td>
          </tr>
        );
      }
      rows.push(<tr key={this.state.numQueries}><td id='query'><Button onClick={()=>this.setState({numQueries: this.state.numQueries+1})}>+</Button></td></tr>);
      return (
        <div>
          <BQLNavBar/>
          <table width="100%">
            <header>
              <tr>
                <td width="15%"/>
                <td>
                  <p id='welcome-title-big'>Welcome to <Image src={require("./logo.svg")} width="170" fluid/></p>
                  <p id='welcome-title-small'>Data analysis tool that uses MIT's BayesDB to deliver powerful data science capabilities to a wide user base. </p>
                  <p align="center">BayesDB uses advanced machine learning and statistical methods to make it easy for you to turn data into real world results. In BQL Studio, you can test and improve the reliability of your data-set, extract insight from it, and find out what would happen in the real world if you made changes to policy.</p>
                  <p id='main-functionalities'>Main functionalities of BQL Studio:</p>
                  <p id='normal-text'><b id='title-text'>EXPLORE SIMILARITY - </b> Helps you to find exceptional datapoints and analyse them or remove them from your dataset.</p>
                  <p id='normal-text'><b id='title-text'>EXPLORE CORRELATION - </b>Helps you to find patterns and trends that you may or may not have expected in the data.</p>
                  <p id='normal-text'><b id='title-text'>TEST or SIMULATE - </b> Helps you to predict what effects a policy change would have if implemented in the real world.</p>
                  <p id='intro-end'/>
                </td>
                <td width="15%"/>
              </tr>
            </header>
            <tbody>
            {rows}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default withRouter(BqlStudio);