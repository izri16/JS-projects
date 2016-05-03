import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import { Link } from 'react-router';

import LoginForm from './LoginForm';
import UserActions from './UserActions';

class Navigation extends Component {
  
  render() {
    const { authenticated, handleSubmitLogin, logout} = this.props;

    return (
      <Navbar style={navigationStyle} inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Musictor</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { 
          !authenticated && 
          <Nav style={forgotPasswordWrapper}>
            <Link style={forgotPasswordStyle} to={'/forgot-passwod'}>Forgot password</Link>
          </Nav>
          }
          <Nav pullRight>
            {authenticated && <UserActions logout={logout} /> || 
            <LoginForm onSubmit={handleSubmitLogin}/>}
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

const forgotPasswordStyle = {
  textDecoration: 'none',
  color: '#9d9d9d'
};

const forgotPasswordWrapper = {
  marginTop: '15px',
  marginLeft: '10px'
};


export default Navigation;
