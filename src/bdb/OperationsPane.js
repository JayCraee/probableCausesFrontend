import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class OperationsPane extends Component {
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button color="info">Run</Button>
          <Button color="info">Edit</Button>
          <Button color="info">Copy</Button>
          <Button color="info">Save</Button>
          <Button color="info">Delete</Button>
        </ButtonGroup>
      </div>
    
    )
  }
}

export default OperationsPane;