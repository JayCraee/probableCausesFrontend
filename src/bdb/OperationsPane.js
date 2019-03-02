import React, {Component} from 'react';
import { Button } from 'reactstrap';


class OperationsPane extends Component {
  render() {
    return (
     <button id='run' onClick={()=>this.props.handleRunQuery()}>
          Run
      </button>
     
    )
  }
}

export default OperationsPane;