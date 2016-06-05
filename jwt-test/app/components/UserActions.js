import React, { PropTypes } from 'react';
import {
  Nav,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

const UserActions = ({ logout }) => {
  return (
    <Nav>
      <NavDropdown title='Actions' id='userActions'>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  );
};

UserActions.propTypes = {
  logout: PropTypes.func.isRequired
};

export default UserActions;
