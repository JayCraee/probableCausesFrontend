import React, {Component} from 'react';
import { Group } from 'react-konva';
import HeatMap from 'react-heatmap-grid';
import HeatMapOutput from './HeatMapOutput';

class OutputPane extends Component {
  //gets results from props
  constructor(props) {
    super(props);
    this.state = {
      xLabels: undefined,
      yLabels:undefined,
      data:undefined,

      results2: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 2,
        colNames: ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'],
        rows: [
          {
            rowName: 'row4',
            values: [12, 15, 7, 33, 16, 8],
          }
          ,
          {
            rowName: 'row5',
            values: [4, 67, 11, 4, 3, 18],
          }
        ]
      },

      results1: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 1,
        rowNames: ['row1', 'row2', 'row3'],
        rows: [
          {
            rowName: 'row4',
            values: [3, 6, 8],
          }
        ]
      },

      results0: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 0,
        rowNames: ['row1'],
        rows: [
          {
            rowName: 'row4',
            values: [3],
          }
        ]
      }
    }
  }

  set xLabels(x) {
    this._xLabels=x;
  }


  renderHeatMap(xHM, yHM, dataHM) {
    return(
    <HeatMap
      xLabels={xHM}
      yLabels={yHM}
      data={dataHM}
    />
    )
  }


  renderGraph() {

  }

  renderValue() {

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
      <HeatMapOutput
        xLabels={this.state.xLabels}
        yLabels={this.state.yLabels}
        data={this.state.data}
      />
    )
  }

  handle1D(res) {
    this.state.xLabels=res.colNames;
    this.state.data=res.rows.values;
    this.props.renderGraph(this.state.xLabels, this.state.data);
  }

  handle0D(res) {

    this.props.renderValue();
  }

  renderOutput(results) {
    /*
    this.state.xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
    this.state.yLabels = ['Sun', 'Mon', 'Tue'];
    this.state.data = new Array(this.state.yLabels.length)
        .fill(0)
        .map(() => new Array(this.state.xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
    */
        
    if (results!=undefined) {
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
                    return this.handle2D();
                  case 1:
                    return this.handle1D();
                  case 0:
                    return this.handle0D();
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
      /*return(
        <HeatMapOutput
          xLabels={this.state.xLabels}
          yLabels={this.state.yLabels}
          data={this.state.data}
        />
      )*/
    }
  

  render() {
    //TODO
    // check if this.props.results are not undefined, if yes:
    // convert format of this.props.results to format acceptable by graph
    // draw graph of results

      const divStyle = {
        height: 300+'px',
        width: 750+'px',
        backgroundColor: '#E3ECF2',
      };

      /*
      this.state.xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
      this.state.yLabels = ['Sun', 'Mon', 'Tue'];
      this.state.data = new Array(this.state.yLabels.length)
        .fill(0)
        .map(() => new Array(this.state.xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
      */
      return (
        <div style={divStyle}>
          <Group>
              {this.renderOutput(this.state.results2)}
          </Group>
        </div>
      );
    }
  }
    
export default OutputPane;