import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';

class Login extends Component {

  render() {
    return (
      <Form style={formStyle} inline>
        <FormGroup controlId='emailLogin'>
          <ControlLabel style={labelStyle}>Email</ControlLabel>
          {' '}
          <FormControl type='email' placeholder='Email' style={inputStyle}/>
        </FormGroup>
        {' '}
        <FormGroup controlId='passwordLogin'>
          <ControlLabel style={labelStyle}>Password</ControlLabel>
          {' '}
          <FormControl type='password' placeholder='Password' style={inputStyle}/>
        </FormGroup>
        {' '}
        <Button type='submit' style={buttonStyle}>
          Login
        </Button>
      </Form>
    );
  }
}

const formStyle = {
  marginTop: '10px'
};

const labelStyle = {
  color: '#BBBBBB'
};

const inputStyle = {
  height: '30px'
};

const buttonStyle = {
  height: '30px',
  lineHeight: '1em'
};


export default Login;
