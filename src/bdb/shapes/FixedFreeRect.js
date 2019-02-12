import React, {Component} from 'react';
import { Layer, Rect, Stage} from 'react-konva';
import FixedFreeButtons from './FixedFreeButtons';

class FixedFreeRect extends Component {
  render() {
   
    return (
        <Stage width='100' height='50' draggable='true'>
          <Layer>
            <Rect width={100} height={50} fill='blue' stroke='black' strokeWidth='5' shadowBlur={10}/>
          </Layer>
        </Stage>
    );
  }
}

export default FixedFreeRect;