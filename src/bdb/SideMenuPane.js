import React, { Component } from 'react';

class SideMenuPane extends Component {
  render() {
    const divStyle = {
      height: this.props.height+'px',
      width: this.props.width+'px',
      backgroundColor: 'powderblue',
    };

    return(<div style={divStyle}/>);
  }
}

export default SideMenuPane;