import React, {Component} from 'react';
import { Group } from 'react-konva';
import HeatMap from 'react-heatmap-grid';

class OutputPane extends Component {
  //gets results from props
  constructor(props) {
    super(props);
    this.state = {
      results2: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 2,
        rowNames: ['row1', 'row2', 'row3'],
        results: [
          {
            rowName: 'row4',
            values: [3, 6, 8],
          }
          ,
          {
            rowName: 'row5',
            values: [3, 6, 8],
          }
        ]
      },

      results1: {
        query: 'ESTIMATE',
        expression: 'CORRELATION',
        dimensions: 1,
        rowNames: ['row1', 'row2', 'row3'],
        results: [
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
        results: [
          {
            rowName: 'row4',
            values: [3],
          }
        ]
      }
    }
  }


    render() {
      //TODO
      // check if this.props.results are not undefined, if yes:
      // convert format of this.props.results to format acceptable by graph
      // draw graph of results

        const divStyle = {
          height: 300+'px',
          width: 750+'px',
          backgroundColor: '#AEBCD9',
        };

        const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
        const yLabels = ['Sun', 'Mon', 'Tue'];
        const data = new Array(yLabels.length)
            .fill(0)
            .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
   
        return (
          
          <div style={divStyle}>
            <Group>
            <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              data={data}
            />
          </Group>
        
          </div>
          
        );
    
      }
    }
    
export default OutputPane;