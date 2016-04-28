import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import { Link } from 'react-router';

import LoginForm from './LoginForm';
import UserActions from './UserActions';

class NavBar extends Component {
  
  render() {
    const {isLoggedIn} = this.props;
    return (
      <Navbar style={navigationStyle} inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/home'}>Musictor</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {isLoggedIn && <UserActions /> || <LoginForm />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const navigationStyle = {
  borderRadius: 0,
  margin: 0
};


export default NavBar;
