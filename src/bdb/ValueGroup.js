import React, {Component} from 'react';
import { number } from 'prop-types';

class ValueGroup extends Component{

    render() {
        let barPadding = 2
        let barColour = '#1c6ca1'
        let widthScale = d => number.toString(d).length*4+10
    
        let props=this.props
        let width = widthScale(props.d.value)
        let yMid = props.barHeight * 0.5
    
        return (
            <g className="bar-group">
                <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
                <rect y={barPadding * 0.15} width={width} height={props.barHeight - barPadding} fill={barColour} />
                <text className="value-label-dark" x={width+8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
            </g>
        )
    }
}

export default ValueGroup;