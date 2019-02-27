import React from 'react';
import BarGroup from './BarGroup';
import ValueGroup from './ValueGroup';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    render() {
        let xOffset=270;
        let yOffset=60;
        this.state.data=new Array(this.props.xLabels.length);
        for (var i=0; i<this.props.xLabels.length; i++) {
            this.state.data[i]={name:this.props.xLabels[i], value:this.props.data[i]};
        }
        let barHeight=30;
        let barGroups=undefined;
        if (this.props.dimensions===0) {
            barGroups = this.state.data.map((d, i) => 
            <g transform={`translate(0, ${i * barHeight})`}>
                <ValueGroup d={d} barHeight={barHeight} />
            </g> )
        } else {
            barGroups = this.state.data.map((d, i) => 
            <g transform={`translate(0, ${i * barHeight})`}>
                <BarGroup d={d} barHeight={barHeight} />
            </g> )
        }
   
        return (
            <svg  width={this.props.width} height={this.props.height}>
                <g className="container">
                    <text 
                        className={this.props.dimensions===0 ? "name-label-zero-dimension" : ""}
                        x={xOffset}
                        y={this.props.dimensions===0 ? yOffset-7 : yOffset-30}
                    >
                    {this.props.yLabels}
                    </text>
                </g>
                <g className="chart" transform={`translate(${xOffset}, ${yOffset})`}>
                    {barGroups}
                </g>
            </svg>
        )
    }
}

export default BarChart;