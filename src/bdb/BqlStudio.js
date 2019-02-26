import React, {Component} from 'react';
import {Button} from 'reactstrap';
import QueryPane from './QueryPane';
import {withRouter} from "react-router-dom";
import BQLNavBar from './BQLNavBar';

class BqlStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numQueries: 1,
    }
  }


  static getExpressions() {
    return ['SIMILARITY', 'CORRELATION'];
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.state.numQueries; ++i) {
      rows.push(<tr><td id='query'><QueryPane/></td></tr>)
    }
    rows.push(<tr><td id='query'><Button onClick={()=>this.setState({numQueries: this.state.numQueries+1})}>+</Button></td></tr>);
    return (
      <div>
        <BQLNavBar/>
        <table width="100%">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(BqlStudio);