import React, {Component} from 'react';
import { Group } from 'react-konva';
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

      results2: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 2,
        colNames: ['Kenya', 'Uganda', 'Tanzania', 'Chad', 'Ghana', 'Algeria', 'Guinea'],
        rows: [
          {
            rowName: 'Kenya',
            values: [100, 12, 15, 17, 33, 16, 38],
          },
          {
            rowName: 'Uganda',
            values: [0.12, 0, 0.11, 0.14, 0.49, 0.67, 0.102],
          },
          {
            rowName: 'Tanzania',
            values: [0.15, 0.11, 0, 0.14, 0.33, 0.17, 0.57],
          },
          {
            rowName: 'Chad',
            values: [0.17, 0.67, 0.11, 0, 0.14, 0.9, 0.64],
          },
          {
            rowName: 'Ghana',
            values: [0.33, 0.49, 0.33, 0.14, 0, 0.22, 0.2],
          },
          {
            rowName: 'Algeria',
            values: [0.16, 0.67, 0.17, 0.9, 0.22, 0, 0.18],
          },
          {
            rowName: 'Guinea',
            values: [0.38, 0.102, 0.57, 0.64, 0.2, 0.18, 0],
          }
        ]
      },

      results1: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 1,
        colNames: ['Kenya', 'Chad', 'Ghana'],
        rows: [
          {
            rowName: 'Algeria',
            values: [0.135, 0.62, 0.81],
          }
        ]
      },

      results0: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 0,
        colNames: ['Kenya'],
        rows: [
          {
            rowName: 'Guinea',
            values: [0.143],
          }
        ]
      }
    }
  }

  /* Set xLabels, yLabels and data states
   * then draw HeatMap.
   */
  handle2D(results) {
    this.state.xLabels=results.colNames;
    this.state.yLabels=new Array();
    this.state.data=new Array(results.rows.length);

    //iterate through rows
    for (var i=0; i<results.rows.length; i++) {
      let helpArray = new Array(results.rows[i].values.length);
      this.state.yLabels[i]=results.rows[i].rowName;

      // iterate through columns
      for (var j=0; j<results.rows[i].values.length; j++) {
        helpArray[j]=results.rows[i].values[j];
      }
      this.state.data[i]=helpArray;
    }
    return(
      <HeatMap
        xLabels={this.state.xLabels}
        yLabels={this.state.yLabels}
        data={this.state.data}
        yLabelWidth={120}
      />
    )
  }

  /* Set xLabels, yLabels and data states
   * then draw BarChart.
   */
  handle1D(results) {
    this.state.xLabels=results.colNames;
    this.state.yLabels=results.rows[0].rowName;
    this.state.data=results.rows[0].values;
    return(
      <BarChart 
        xLabels={this.state.xLabels}
        yLabels={this.state.yLabels}
        data={this.state.data}
        dimensions={results.dimensions}
      />
    )
    
  }

  /* Set xLabels, yLabels and data states
   * then display the value.
   */
  handle0D(results) {
    this.state.xLabels=[results.colNames[0]];
    this.state.yLabels=results.rows[0].rowName;
    this.state.data=[results.rows[0].values[0]];
    return(
      <div>
        <BarChart
          xLabels={this.state.xLabels}
          yLabels={this.state.yLabels} 
          data={this.state.data}
          dimensions={results.dimensions}/>
      </div>
    )
  }

  renderOutput(results) {
        
    if (results!==undefined) {
      let res=results;

      switch(res.query) {
          case "ESTIMATE":
            switch(res.expression) {

              case "CORRELATION":
                switch(res.dimensions) {
                  case 2:
                    return this.handle2D(res);
                  case 1:
                    return this.handle1D(res);
                  case 0:
                    return this.handle0D(res);
                  default:
                }

              case "SIMILARITY":
                switch(res.dimensions) {
                  case 2:
                    return this.handle2D(res);
                  case 1:
                    return this.handle1D(res);
                  case 0:
                    return this.handle0D(res);
                  default:
                }
              default:
                // not supported expression
            }
            break;
            default:
              return;
              // not supported query
        } 
      } 
    }
  

  render() {
      const divStyle = {
        height: this.state.height+'px',
        width: this.state.width+'px',
        backgroundColor: '#E3ECF2',
      };

      //TODO: replace this.state.results<number> to this.props.results
      return (
        <div style={divStyle}>
          <button className="output-title">{this.state.results1.expression}</button>
          {this.renderOutput(this.state.results1)}
        </div>
      );
    }
  }
    
export default OutputPane;