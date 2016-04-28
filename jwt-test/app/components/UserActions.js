import React, { Component } from 'react';
import {
  Nav,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

class UserActions extends Component {

  render() {
    return (
      <Nav>
        <NavDropdown title='Actions' id='userActions'>
          <MenuItem>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

export default UserActions;
