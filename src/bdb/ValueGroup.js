import React, {Component} from 'react';
import { number } from 'prop-types';

class ValueGroup extends Component{
    constructor(props){
        super(props)
    }

    render() {
        let barPadding = 2
        let barColour = '#348AA7'
        let widthScale = d => number.toString(d).length*4+10
    
        let props=this.props
        let width = widthScale(props.d.value)
        let yMid = props.barHeight * 0.5
    
        return (
            <g className="bar-group">
            <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
            <rect y={barPadding * 0.15} width={width} height={props.barHeight - barPadding} fill={barColour} />
            <text className="value-label" x={width-8<8 ? width+20: width-8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
            </g>
        )
    }
}

export default ValueGroup;