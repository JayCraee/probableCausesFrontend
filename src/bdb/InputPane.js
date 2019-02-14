import React, {Component} from 'react';
import DiagramPane from './DiagramPane';
import SideMenuPane from './SideMenuPane';
import UnsupportedSideMenuError from "./error/UnsupportedSideMenuError";

class InputPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: 0,
    }
  }

  getSideMenuHandler(currentlySelected) {
    switch (currentlySelected) {
      case 0:
        //empty
        return (() => {});
      case 1:
        //choose expression
        return (expressionNumClicked => {
          this.setState({
            currentlySelected: 0
          });
          this.props.handleChooseExpression(0, expressionNumClicked);
        });
      case 2:
        //in the context of
        return (columnName => {this.props.handleChangeSimilarityContext(2, columnName)});
      case 3:
        //TODO
        return (() => {});
      case 4:
        //order by
        return (order => {this.props.handleChangeOrderBy(order)});
      case 5:
        //limit
        return (value => {this.props.handleChangeLimit(value)});
      case 6:
        //TODO
        return (() => {});
      default:
        throw new UnsupportedSideMenuError(currentlySelected);
    }
  }

  handleSelectBlock(currentlySelected) {
    this.setState({
      currentlySelected: currentlySelected,
    });
  }

  handleFixRow(rowNum, fixed) {
    this.setState({
      currentlySelected: 0,
    });
    this.props.handleFixRow(rowNum, fixed);
  }

  render() {
    const sideMenuWidth = 250;
    const diagramWidth = 500;

    const height = 600;

    return (
      <table>
        <tbody>
          <tr>
            <td>
              <SideMenuPane
                width={sideMenuWidth}
                height={height}
                query={this.props.query}
                currentlySelected={this.state.currentlySelected}
                onClick={this.getSideMenuHandler(this.state.currentlySelected)}
              />
            </td>
            <td>
              <DiagramPane
                width={diagramWidth}
                height={height}
                query={this.props.query}
                handleSelectBlock={currentlySelected=>this.handleSelectBlock(currentlySelected)}
                handleFixRow={(rowNum, fixed)=>this.handleFixRow(rowNum, fixed)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default InputPane;