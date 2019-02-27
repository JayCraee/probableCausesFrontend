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
              <td width="10%"/>
              <td>
                <p align="center">This section could provide some information about how to use BQL Studio. Just a quick summary.</p>
                <p> Sample paragraph (for styling purposes): Sub-Saharan Africa is the global capital for road traffic deaths. Indeed, there has been no progress in reducing the number of deaths from road traffic incidents in any low-income country between 2013 and 2016, according to the World Health Organization’s 2018 Global Status Report on Road Safety. Globally, the number of road traffic deaths have continued to increase, reaching 1.35 million in 2016, the latest data show. Road traffic deaths are now the eighth-leading cause of death for all age groups—killing more people than tuberculosis and HIV/AIDS—and the leading cause of death for children and young adults between the ages of 5 and 29. While some countries have made progress with regard to post-crash care and have passed legislation to regulate road traffic risk factors such as vehicle safety standards, the improvements haven’t keep up with the “motorization of transport” trend and rising population growth. At the current pace, the WHO estimates that the target of halving road traffic deaths by 2020—one of the United Nations’ Sustainable Development Goals—will not be met. </p>
              </td>
              <td width="10%"/>
            </tr>
            <tr height="10px"/>
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