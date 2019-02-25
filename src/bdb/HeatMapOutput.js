import React, {Component} from 'react';
import HeatMap from 'react-heatmap-grid';

class HeatMapOutput extends Component {

  render() {
    return(
        <HeatMap
          xLabels={this.props.xLabels}
          yLabels={this.props.yLabels}
          data={this.props.data}
        />
    )
  }
}

export default HeatMapOutput;