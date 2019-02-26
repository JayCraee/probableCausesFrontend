import React, {Component} from 'react';
import DiagramPane from './DiagramPane';
import SideMenuPane from './SideMenuPane';
import UnsupportedSideMenuError from "./error/UnsupportedSideMenuError";
import SimulatePane from "./SimulatePane";
import EstimateQuery from "./data/EstimateQuery";
import SimulateQuery from "./data/SimulateQuery";
import QueryChoicePane from "./QueryChoicePane";

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

  renderEstimate() {
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
            />
          </td>
          <td>
            <DiagramPane
              width={diagramWidth}
              height={height}
              query={this.props.query}
            />
          </td>
        </tr>
        </tbody>
      </table>
    );
  }

  renderSimulate() {
    let width = 500;
    let height = 600;
    return <SimulatePane
      width={width}
      height={height}
      query={this.props.query}
      changeConstraint={this.props.handleChangeConstraint}
      addConstraint={this.props.handleAddConstraint}
      removeConstraint={this.props.handleRemoveConstraint}
      changeFieldToSimulate={this.props.handleChangeFieldToSimulate}
      addFieldToSimulate={this.props.handleAddFieldToSimulate}
      removeFieldToSimulate={this.props.handleRemoveFieldToSimulate}
    />
  }

  renderQueryChoice() {
    let width=500;
    return <QueryChoicePane
      width={width}
      setQuery={this.props.handleSetQuery}
    />
  }

  render() {
    if (this.props.query === undefined) {
      return this.renderQueryChoice();
    } else if (this.props.query instanceof EstimateQuery) {
      return this.renderEstimate();
    } else if (this.props.query instanceof SimulateQuery) {
      return this.renderSimulate();
    }
  }
}

export default InputPane;