import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class FixedFreeButtons extends Component {
  render() {
    
    return (
        <div>
            <ButtonGroup vertical>
                    <Button color="info">Single row</Button>
                    <Button color="info">Multiple rows</Button>
            </ButtonGroup>  
        </div>
    );
  }
}

export default FixedFreeButtons;



