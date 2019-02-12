import React, {Component} from 'react';
import DiagramPane from './DiagramPane';
import SideMenuPane from './SideMenuPane';

class InputPane extends Component {
  render() {
    const sideMenuWidth = 250;
    const diagramWidth = 500;

    const height = 600;

    return (
      <table>
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