import React, {Component} from 'react';


class OperationsPane extends Component {
  render() {
    return (
      <div>
        <div className="op-button-group" onClick={()=>this.props.handleRunQuery()}><button className="op-run">Run</button></div>
        <div className="op-button-group"><button className="op-del">Delete</button></div>
      </div>
    )
  }
}

export default OperationsPane;