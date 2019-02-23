import React, {Component} from 'react';
import DiagramPane from './DiagramPane';
import SideMenuPane from './SideMenuPane';
import UnsupportedSideMenuError from "./error/UnsupportedSideMenuError";

class InputPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: 1,
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
        //row 1 boolExpr
        return (boolExpr => {this.props.handleChangeRowBoolExpr(1, boolExpr)});
      case 4:
        //order by
        return (order => {this.props.handleChangeOrderBy(order)});
      case 5:
        //limit
        return (value => {this.props.handleChangeLimit(value)});
      case 6:
        //row 2 boolExpr
        return (boolExpr => {this.props.handleChangeRowBoolExpr(2, boolExpr)});
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
    const sideMenuWidth = 350;
    const diagramWidth = 500;

    const height = 620;

    return (
      <table>
        <tbody>
          <tr>
            <td>
              <SideMenuPane
                width={sideMenuWidth}
                height={height}
                query={this.props.query}
                setExpression={this.props.handleChooseExpression}
                setContext={this.props.handleChangeSimilarityContext}
                fixRow={this.props.handleFixRow}
                setRow1Condition={boolExpr=>this.props.handleChangeRowBoolExpr(1, boolExpr)}
                setRow2Condition={boolExpr=>this.props.handleChangeRowBoolExpr(2, boolExpr)}
                setOrderBy={this.props.handleChangeOrderBy}
                setLimit={this.props.handleChangeLimit}
                fixCol={this.props.handleFixCol}
                setColName={this.props.handleChangeColName}
                changeConstraint={this.props.handleChangeConstraint}
                addConstraint={this.props.handleAddConstraint}
                changeFieldToSimulate={this.props.handleChangeFieldToSimulate}
                addFieldToSimulate={this.props.handleAddFieldToSimulate}
              />
            </td>
            <td>
              <DiagramPane
                width={diagramWidth}
                height={height}
                query={this.props.query}
                //handleSelectBlock={currentlySelected=>this.handleSelectBlock(currentlySelected)}
                //handleFixRow={(rowNum, fixed)=>this.handleFixRow(rowNum, fixed)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default InputPane;