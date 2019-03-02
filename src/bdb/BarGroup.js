import React, {Component} from 'react';

class BarGroup extends Component{
    constructor(props){
        super(props)
    }

    render() {
        let labelLimit = 130
        let barPadding = 2
        //let barColour = '#329fff'
        //let barColour = '#348AA7'
        let barColour = '#1c6ca1'
        let widthScale = d => d * 500
    
        let props=this.props;
        let width = widthScale(props.d.value)
        let yMid = props.barHeight * 0.5
    
        return (
            <g className="bar-group">
            <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
            <rect y={barPadding * 0.15} width={width} height={props.barHeight - barPadding} fill={barColour} />
            <text className={width<labelLimit ? "value-label-dark": "value-label-light"} x={width<labelLimit ? width+8: width-8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
            </g>
        )
    }
}

export default BarGroup;