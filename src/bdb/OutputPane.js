import React, {Component} from 'react';
import Request from 'react-http-request';
import { Group } from 'react-konva';
import HeatMap from 'react-heatmap-grid';

class OutputPane extends Component {

    render() {
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
              <Request
                //url={this.props.queryToURL(this.state.query)}
                method='get'
                accept='application/json'
                verbose={true}
              >
              {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {
                return <div>{ JSON.stringify(result) }</div>;
                }
              }
              }
            </Request>
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