import React, {Component} from 'react';
import HeatMap from 'react-heatmap-grid';
import BarChart from './BarChart';

class OutputPane extends Component {

  //gets results from props
  constructor(props) {
    super(props);
    this.state = {
      xLabels: undefined,
      yLabels:undefined,
      data:undefined,
      height: 400,
      width: 800,
    }
  }

  // insert whitespace before every uppercase letter
  lexing(string) {
    let returnString = "";
    if (string.length>0) returnString += string.charAt(0);
    let i=1;
    let character='';
    while (i<string.length) {
        character = string.charAt(i);
        if (character === '_') returnString += " ";
        else returnString += string.charAt(i);
        i++;
    }
    return returnString;
  }


  /* Set xLabels, yLabels and data states
   * then draw HeatMap.
   */
  renderHeatMap(results) {
    let xLabels = results.colNames.map(i => this.lexing(i));
    let yLabels = [];
    let data = new Array(results.rows.length);

    //iterate through rows
    for (var i=0; i<results.rows.length; i++) {
      let helpArray = new Array(results.rows[i].values.length);
      yLabels[i]=this.lexing(results.rows[i].rowName);
      // iterate through columns
      for (var j=0; j<results.rows[i].values.length; j++) {
        helpArray[j]=results.rows[i].values[j];
      }
      data[i]=helpArray;
    }
    return(
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        yLabelWidth={220}
        background="#1c6ca1"
      />
    )
  }

  /* Set xLabels, yLabels and data states
   * then draw BarChart.
   */
  renderBarChart(results) {
    let xLabels=results.colNames.map(i => this.lexing(i));
    let yLabels=this.lexing(results.rows[0].rowName);
    let data=results.rows[0].values;
    return(
      <BarChart 
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        dimensions={results.dimensions}
        height={this.state.height}
        width={this.state.width}
      />
    ) 
  }

  renderOutput(results) {
        
    if (results!==undefined) {
      let res=results;

      // case study for different queries, expressions and dimensions
      switch(res.query) {
          case "ESTIMATE":
            switch(res.expression) {
              case "CORRELATION":
                switch(res.dimensions) {
                  case 2:
                    return this.renderHeatMap(res);
                  case 1:
                    return this.renderBarChart(res);
                  case 0:
                    return this.renderBarChart(res);
                  default:
                    // dimension format error
                }
                break;
              case "SIMILARITY":
                switch(res.dimensions) {
                  case 2:
                    return this.renderHeatMap(res);
                  case 1:
                    return this.renderBarChart(res);
                  case 0:
                    return this.renderBarChart(res);
                  default:
                    // dimension format error
                }
                break;
              default:
                // not supported expression
            }
            break;
          case "SIMULATE":
            return this.renderBarChart(res);
          default:
            return this.renderBarChart(res);
        } 
      } 
    }
  

  render() {
      /*****************************************************************************************************************
      * For testing: replace this.props.results to this.state.results<number> where number can be 0, 1, 1b, 2 or 2b
      /*****************************************************************************************************************/
      let results=this.props.results;
      let explanationText = undefined;
      let defaultWidth = 930;

      // Set height and width of the OutPutPane
      switch (results.dimensions) {
        case 0:
          this.state.height=280;
          this.state.width=defaultWidth;
          break;
        case 1:
          this.state.height=220+results.colNames.length*30;
          this.state.width=defaultWidth;
          break;
        case 2:
          if (results.rows.length>5) this.state.height=200+results.rows.length*40;
          else this.state.height=350;
          if (results.colNames.length>7) this.state.width=420+results.colNames.length*80;
          else this.state.width=defaultWidth;
          explanationText = "This is a Heat Map - the darker blues reperesent greater values.";
          break;
        default:
          this.state.height=400;
          this.state.width=defaultWidth;
      }

      const divStyle = {
        height: this.state.height+'px',
        width: this.state.width+'px',
        align: "center"
      };

      return (
        <div style={divStyle}>
          <br/>
          <p className="output-title">{"Results:"}</p>
          {this.renderOutput(results)}
          <br/>
          {explanationText!=undefined ? explanationText : ""}
        </div>
      );
    }
  }
    
export default OutputPane;