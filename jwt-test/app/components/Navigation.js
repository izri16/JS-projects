import React, { Component } from 'react';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { Link } from 'react-router';

import LoginForm from './LoginForm';
import UserActions from './UserActions';

class Navigation extends Component {
  
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


export default Navigation;