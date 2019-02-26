import React, {Component} from 'react';
import { Group, Text } from 'react-konva';
import HeatMap from 'react-heatmap-grid';
import { Button } from 'reactstrap';

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
            values: [12, 100, 11, 14, 49, 67, 102],
          },
          {
            rowName: 'Tanzania',
            values: [15, 11, 100, 14, 33, 17, 57],
          },
          {
            rowName: 'Chad',
            values: [17, 67, 11, 100, 14, 90, 64],
          },
          {
            rowName: 'Ghana',
            values: [33, 49, 33, 14, 100, 22, 2],
          },
          {
            rowName: 'Algeria',
            values: [16, 67, 17, 90, 22, 100, 18],
          },
          {
            rowName: 'Guinea',
            values: [38, 102, 57, 64, 2, 18, 100],
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
            values: [3, 6, 8],
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
            values: [3],
          }
        ]
      }
    }
  }

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

  handle1D(results) {
    this.state.xLabels=results.colNames;
    this.state.yLabells=results.rows[0].rowName;
    this.state.data=results.rows[0].values;
    
  }

  handle0D(results) {
    this.state.xLabels=results.colNames[0];
    this.state.yLabels=results.rows[0].rowName;
    this.state.data=results.rows[0].values[0];
    return(
      <table align="center">
        <tr>
          <td width="20%"/>
          <td width="20%"/>
          <td width="20%">
            <text class="xLabel">{this.state.xLabels}</text>
          </td>
          <td width="40%"/>
           </tr>
        <tr>
        <td/>
          <td>
            <text class="yLabel">{this.state.yLabels}</text>
          </td> 
          <td>
            <button class="value">{this.state.data}</button>
          </td>
          <td/>
        </tr>
      </table>
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

      //TODO: replace this.state.results2 to this.props.results
      return (
        <div style={divStyle}>
          <Group>
            <button class="output-title">{this.state.results2.expression}</button>
            {this.renderOutput(this.state.results2)}
          </Group>
        </div>
      );
    }
  }
    
export default OutputPane;