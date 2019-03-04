import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {GridLoader} from 'react-spinners';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";
import BQLNavBar from './BQLNavBar';
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'
import { goToAnchor } from 'react-scrollable-anchor'
import { Image } from 'react-bootstrap'

class BqlStudio extends Component {
  constructor(props) {
    super(props);

    let test = true;
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
        columns: ['speed', 'injury', 'vehicle', 'fatality', 'area', 'city', 'people-involved'],
        nominalColumns: ['speed', 'injury', 'vehicle', 'fatality', 'area', 'city', 'people-involved'],
        loading: false,
        numQueries: 1,
        test: true,
      };
    }

  }


  handleNewQuery() {
    this.setState({numQueries: this.state.numQueries+1});
    goToAnchor('section'+(this.state.numQueries+1), true);

    //goToTop();
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
      return <div align="center"><GridLoader
        loading={true}
      />
      loading...
      </div>
    } else {
      configureAnchors({offset: -10, scrollDuration: 1000});
      let rows = [];
      for (let i = 0; i < this.state.numQueries; ++i) {
        rows.push(<tr height="35px"/>);
        rows.push(<hr/>);
        rows.push(<tr height="30px"/>);
        rows.push(
          <tr>
            <ScrollableAnchor id={'section'+(i+1)}>
              <p id='welcome-title-small'>Query {i+1}</p>
            </ScrollableAnchor>
          </tr>);
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
      rows.push(<tr key={this.state.numQueries}>
                  <td id='query'>
                    <Button style={{backgroundColor: "#2ec077"}} onClick={()=>this.handleNewQuery()}>
                      New query
                    </Button>
                  </td>
                </tr>);
      return (
        <div>
          <BQLNavBar/>
          <table id='centered'>
            <header>
              <p> id='welcome-title-big' </p>
              <p> id='welcome-title-big' </p>
              <p id='welcome-title-big'>Welcome to <Image src={require("./logo.svg")} alt="" width="170" fluid/></p>
              <p id='welcome-title-small'>Data analysis tool that uses MIT's BayesDB to deliver powerful data science capabilities to a wide user base. </p>
              <p> BayesDB uses advanced machine learning and statistical methods to make it easy for you to turn data into real world results. <br/> In BQL Studio, you can test and improve the reliability of your data-set, extract insight from it, and find out what would happen in the real world if you made changes to policy.</p>
              <p id='main-functionalities'>Main functionalities of BQL Studio:</p>
              <p id='normal-text'><b id='title-text'>EXPLORE SIMILARITY - </b> Helps you to find exceptional datapoints and analyse them or remove them from your dataset.</p>
              <p id='normal-text'><b id='title-text'>EXPLORE CORRELATION - </b>Helps you to find patterns and trends that you may or may not have expected in the data.</p>
              <p id='normal-text'><b id='title-text'>TEST or SIMULATE - </b> Helps you to predict what effects a policy change would have if implemented in the real world.</p>
              <p id='intro-end'/>
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