import React, {Component} from 'react';
import DiagramPane from './DiagramPane';
import SideMenuPane from './SideMenuPane';

class InputPane extends Component {
  render() {
    const width = 1500;
    const height = 500;

    const sideMenuWidth = Math.floor(width/6);
    const diagramWidth = Math.floor(width*5/6);

    return (
      <table id="input-pane-table">
        <tbody>
          <tr>
            <td><SideMenuPane width={sideMenuWidth} height={height}/></td>
            <td><DiagramPane width={diagramWidth} height={height}/></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default InputPane;