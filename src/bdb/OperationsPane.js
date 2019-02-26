import React, {Component} from 'react';


class OperationsPane extends Component {
  render() {
    return (
      <div>
        <div class="op-button-group" onClick={()=>this.props.handleRunQuery()}><button class="op-run">Run</button></div>
        <div class="op-button-group"><button class="op-del">Delete</button></div>
      </div>
    )
  }
}

export default OperationsPane;