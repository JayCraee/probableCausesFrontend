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
      width: 750,

      // Examples of the structure of this.props.results
      /*********************************************************************************************************************/
      results2: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 2,
        colNames: ["VehicleType", "SecondVehicleType", "Date", "Time", "RoadHasPavement", "DistanceToNearestTrafficLight",
                   "SpeedLimit", "EstimatedSpeedOfCollision",  "SeatBeltUsed", "Severity OfDamage", "LandUse", "City"],
        rows: [
          {
            rowName: 'VehicleType',
            values: [0, 0.12, 0.15, 0.17, 0.33, 1, 0.38, 0.5, 0.12, 0.15, 0.17, 0.33],
          },
          {
            rowName: 'SecondVehicleType',
            values: [0.12, 0, 0.11, 0.14, 0.49, 0.67, 0.102, 0.3, 0.12, 0.15, 0.17, 0.33],
          },
          {
            rowName: 'EstimatedSpeedOfCollision',
            values: [0.15, 0.11, 0, 0.14, 0.33, 0.17, 0.57, 0, 0.12, 0.15, 0.17, 0.33],
          },
          {
            rowName: 'Date',
            values: [0.17, 0.67, 0.11, 0, 0.14, 0.9, 0.64, 0.2, 0.12, 0.15, 0.17, 0.33],
          },
          {
            rowName: 'Time',
            values: [0.33, 0.49, 0.33, 0.14, 0, 0.22, 0.2, 0.4, 0.12, 0.15, 0.17, 0.33],
          },
          {
            rowName: 'RoadHasPavement',
            values: [0.16, 0.67, 0.17, 0.9, 0.22, 0, 0.18, 0.1, 0.12, 0.15, 0.17, 0.33],
          }/*,
          {
            rowName: 'DistanceToNearestTrafficLight',
            values: [0.38, 0.102, 0.57, 0.64, 0.2, 0.18, 0, 0, 0.12, 0.15, 0.17],
          }*/
        ]
      },

      results2b: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 2,
        colNames: ['Kenya', 'Uganda', 'EstimatedSpeedOfCollision', 'Chad', 'Ghana', 'Algeria', 'Guinea',
                    'Kenya', 'Uganda', 'Tanzania', 'Chad', 'Ghana', 'DistanceToNearestTrafficLight', 'Guinea'],
        rows: [
          {
            rowName: 'Kenya',
            values: [0, 0.12, 0.15, 0.17, 0.33, 1, 0.38, 0, 0.12, 0.15, 0.17, 0.33, 1, 0.38],
          },
          {
            rowName: 'DistanceToNearestTrafficLight',
            values: [0.12, 0, 0.11, 0.14, 0.49, 0.67, 0.102, 0.38, 0.102, 0.57, 0.64, 0.2, 0.18, 0],
          }
        ]
      },

      results1: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 1,
        colNames: ['EstimatedSpeedOfCollision', 'Uganda', 'EstimatedSpeedOfCollision', 'Chad'],
        rows: [
          {
            rowName: 'EstimatedSpeedOfCollision',
            values: [423435, 0.62, 2, 0.135],
          }
        ]
      },

      results1b: {
        query: 'SIMULATE',
        expression: 'CORRELATION',
        dimensions: 1,
      colNames: ['Kenya', 'Uganda', 'Tanzania', 'Chad', 'Ghana', 'DistanceToNearestTrafficLight', 'Guinea'],
        rows: [
          {
            rowName: 'Morocco',
            values: [0.135, 0.62, 0.3, 0.135, 0.102, 1, 0.09],
          }
        ]
      },

      results0: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 0,
        colNames: ['DistanceToNearestTrafficLight'],
        rows: [
          {
            rowName: 'Guinea',
            values: [6],
          }
        ]
      },

      resultSimulate: {
        query: 'SIMULATE',
        data: [
          {
            label: 'VehicleType',
            value: 1232
          }
        ]
      }
      /*********************************************************************************************************************/
      // End of examples
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
        if (character === character.toUpperCase()) {
           returnString += " "; 
        }
        returnString += string.charAt(i);
        i++;
    }
    return returnString;
  }


  /* Set xLabels, yLabels and data states
   * then draw HeatMap.
   */
  renderHeatMap(results) {
    // column names
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
        //xLabelsLocation="bottom"
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

      // Set height and width of the OutPutPane
      switch (results.dimensions) {
        case 0:
          this.state.height=280;
          this.state.width=750;
          break;
        case 1:
          this.state.height=220+results.colNames.length*30;
          this.state.width=900;
          break;
        case 2:
          if (results.rows.length>5) this.state.height=200+results.rows.length*30;
          else this.state.height=350;
          if (results.colNames.length>7) this.state.width=420+results.colNames.length*80;
          else this.state.width=900;
          break;
        default:
          this.state.height=400;
          this.state.width=750;
      }

      // Basic styling of OutputPane
      const divStyle = {
        height: this.state.height+'px',
        width: this.state.width+'px',
        backgroundColor: '#E3ECF2',
      };

      /* Display name of expression as the title,
       * then call function to display the heatmap/chart
       */
      return (
        <div style={divStyle}>
          <br></br>
          <p className="output-title">{results.expression+":"}</p>
          {this.renderOutput(results)}
        </div>
      );
    }
  }
    
export default OutputPane;