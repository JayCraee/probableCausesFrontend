import React, {Component} from 'react';


class OperationsPane extends Component {
  render() {
    return (
      <div>
        <div className="op-button-group"><button width="500px" className="op-run" onClick={()=>this.props.handleRunQuery()}>Run</button></div>
      </div>
    )
  }
}

export default OperationsPane;