import React from 'react';
import BarGroup from './BarGroup';
import ValueGroup from './ValueGroup';

class BarChartResponsive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    udpateMaxValue(max, n) {
        if (n>max) return n;
        else return max;
    }

    render() {
        let xOffset=270;
        let yOffset=60;
        this.state.data=new Array(this.props.xLabels.length);
        let barHeight=30;
        let barGroups=undefined;
        let maxValue=0;

        for (var i=0; i<this.props.xLabels.length; i++) {
            this.state.data[i]={name:this.props.xLabels[i], value:this.props.data[i]};
            this.udpateMaxValue(maxValue, this.props.data[i]);
        }
        if (this.props.dimensions===0) {
            barGroups = this.state.data.map((d, i) => 
            <g transform={`translate(0, ${i * barHeight})`}>
                <ValueGroup d={d} barHeight={barHeight} />
            </g> )
        } else {
            barGroups = this.state.data.map((d, i) => 
            <g transform={`translate(0, ${i * barHeight})`}>
                <BarGroup d={d} barHeight={barHeight} maxValue={maxValue} />
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

export default BarChartResponsive;