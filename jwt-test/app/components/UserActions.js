import React, { Component, PropTypes } from 'react';
import {
  Nav,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

class UserActions extends Component {

  render() {
    const { logout } = this.props;

    return (
      <Nav>
        <NavDropdown title='Actions' id='userActions'>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

UserActions.propTypes = {
  logout: PropTypes.func.isRequired
};

export default UserActions;
