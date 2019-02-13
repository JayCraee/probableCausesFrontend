import React, {Component} from 'react';
import DiagramPane from './DiagramPane';
import SideMenuPane from './SideMenuPane';
import UnsupportedSideMenuError from "./error/UnsupportedSideMenuError";

class InputPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: 5,
    }
  }

  handleChooseExpressionClick(expressionNumClicked) {
    this.props.onClick(0, expressionNumClicked);
  }

  getSideMenuHandler(currentlySelected) {
    switch (currentlySelected) {
      case 0:
        return (() => {});
      case 1:
        return (expressionNumClicked => {this.props.onClick(0, expressionNumClicked)});
      case 2:
        //TODO
        return (() => {});
      case 3:
        //TODO
        return (() => {});
      case 4:
        //TODO
        return (() => {});
      case 5:
        //TODO
        return (() => {});
      case 6:
        //TODO
        return (() => {});
      default:
        throw new UnsupportedSideMenuError(currentlySelected);
    }
  }

  handleDiagramClick(currentlySelected) {
    this.setState({
      currentlySelected: currentlySelected,
    })
  }

  render() {
    const sideMenuWidth = 250;
    const diagramWidth = 500;

    const height = 600;

    return (
      <table>
        <tbody>
          <tr>
            <td><SideMenuPane
              width={sideMenuWidth}
              height={height}
              currentlySelected={this.state.currentlySelected}
              onClick={this.getSideMenuHandler(this.state.currentlySelected)}
            />
            </td>
            <td><DiagramPane
              width={diagramWidth}
              height={height}
              onClick={i => this.handleDiagramClick(i)}
              query={this.props.query}/>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default InputPane;