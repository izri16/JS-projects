import React, { Component, PropTypes } from 'react';
import { reduxForm, initialize } from 'redux-form';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';

class LoginForm extends Component {

  componentWillMount() {
    this.props.dispatch(initialize('login', {
      email: '',
      password: ''
    }, ['email', 'password']));
  }

  render() {
    const {fields: {email, password}, handleSubmit, error} = this.props;

    return (
      <Form onSubmit={handleSubmit} style={formStyle} inline>
        {
          error && <h3 style={errorStyle}>{error}</h3>
        }
        <FormGroup controlId='emailLogin'>
          <ControlLabel style={labelStyle}>Email</ControlLabel>
          {' '}
          <FormControl
            type='email'
            placeholder='Email'
            style={inputStyle}
            {...email}/>
        </FormGroup>
        {' '}
        <FormGroup controlId='passwordLogin'>
          <ControlLabel style={labelStyle}>Password</ControlLabel>
          {' '}
          <FormControl
            type='password'
            placeholder='Password'
            style={inputStyle}
            {...password}/>
        </FormGroup>
        {' '}
        <Button onClick={handleSubmit} type='submit' style={buttonStyle}>
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

const errorStyle = {
  color: '#CE2323'
};

LoginForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
};

// decorator
export default LoginForm = reduxForm({
  form: 'login',                           // a unique name for this form
  fields: ['email', 'password']            // all the fields in your form
})(LoginForm);
