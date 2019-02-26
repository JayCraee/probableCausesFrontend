import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class BQLNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar className="nav-bar" dark expand="md">
      <NavbarBrand tag={Link} to="/">BQL Studio</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              href="http://probcomp.csail.mit.edu/dev/bayesdb/doc/bql.html">BQL: Bayesian Query Language</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://wiki.cam.ac.uk/cl-design-projects/Probable_Causes">The project: "Probable Causes"</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}