import React, {Component} from 'react';
import BarGroup from './BarGroup';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            row: {name:undefined, value:undefined}
        }
    }

    render() {
        this.state.data=new Array(this.props.xLabels.length);
        for (var i=0; i<this.props.xLabels.length; i++) {
            this.state.data[i]={name:this.props.xLabels[i], value:this.props.data[i]};
        }
        let barHeight=30;
        let barGroups = this.state.data.map((d, i) => 
            <g transform={`translate(0, ${i * barHeight})`}>
                <BarGroup d={d} barHeight={barHeight} />
            </g>
        )

        return (
            <svg width="800" height="300" >
                <g className="container">
                    <text x="10" y="30">{this.props.yLabels}</text>
                </g>
                <g className="chart" transform="translate(100,60)">
                    {barGroups}
                </g>
            </svg>
        )
    }
}

export default BarChart;