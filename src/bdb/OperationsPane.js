import React, {Component} from 'react';


class OperationsPane extends Component {
  render() {
    return (
      <button id='op-run' onClick={()=>this.props.handleRunQuery()}>Run</button>
    )
  }
}

export default OperationsPane;