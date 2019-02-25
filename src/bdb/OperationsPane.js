import React, {Component} from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


class OperationsPane extends Component {
  render() {
    return (
      <div>
        <div class="op-button-group"><button class="op-run">Run</button></div>
        <div class="op-button-group"><button class="op-del">Delete</button></div>
      </div>
      /*<div class="btn-group">
      <button type="button" class="btn btn-default">Left</button>
      <button type="button" class="btn btn-default">Middle</button>
      <button type="button" class="btn btn-default">Right</button>
    </div> 
      <Container>
       <Row>
          <Col><button class="op-button">Run</button></Col>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
        </Row>
      </Container>*/
    )
  }
}

export default OperationsPane;