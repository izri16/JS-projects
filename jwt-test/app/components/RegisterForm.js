import React, { Component, PropTypes } from 'react';
import { reduxForm, initialize } from 'redux-form';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Form
} from 'react-bootstrap';

import validateRegisterForm from '../utils/validateRegisterForm';
import CustomButton from './CustomButton';

class RegisterForm extends Component {

  componentWillMount() {
    this.props.dispatch(initialize('register', {
      login: '',
      email: '',
      password: '',
      passwordCheck: ''
    }, ['login', 'email', 'password', 'passwordCheck']));
  }

  render() {
    const {fields: {login, email, password, passwordCheck}, handleSubmit, error} = this.props;
    const SUCCESS = 'success';
    const ERROR = 'error';

    return (
      <Form onSubmit={handleSubmit}>
        {
          error && <h3 style={errorStyle}>{error}</h3> ||
          <h4>Thank you for registration! Confirmation email was sent to your email address</h4>
        }
        <FormGroup
          controlId='registerLogin'
          validationState={login.error.message && login.touched && ERROR ||
                          !login.error.message && (login.active || login.touched) && SUCCESS}
          >
          <ControlLabel>Login</ControlLabel>
          <FormControl
            type='text'
            placeholder='Enter login'
            {...login}
          />
          {login.error.message && login.touched &&
            <HelpBlock>{login.error.message}</HelpBlock>
          }
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId='registerEmail'
          validationState={email.error.message && email.touched && ERROR ||
                          email.submitError && ERROR ||
                          !email.error.message && (email.active || email.touched) && SUCCESS}
          >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type='email'
            placeholder='Enter email'
            {...email}
          />
          {email.error.message && email.touched &&
            <HelpBlock>{email.error.message}</HelpBlock>
          }
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId='registerPassword'
          validationState={password.error.message && password.touched && ERROR || 
                          !password.error.message && (password.active || password.touched) && SUCCESS}
          >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type='password'
            placeholder='Enter password'
            {...password}
          />
          {password.error.message && password.touched &&
            <HelpBlock>{password.error.message}</HelpBlock>
          }
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId='registerPasswordCheck'
          validationState={passwordCheck.error.message && passwordCheck.touched && ERROR || 
                          !passwordCheck.error.message &&
                          (passwordCheck.active || passwordCheck.touched) && SUCCESS}
          >
          <ControlLabel>Password confirm</ControlLabel>
          <FormControl
            type='password'
            placeholder='Confirm password'
            {...passwordCheck}
          />
          {passwordCheck.error.message && password.touched && passwordCheck.touched &&
            <HelpBlock>{passwordCheck.error.message}</HelpBlock>
          }
          <FormControl.Feedback />
        </FormGroup>
        <CustomButton type='submit' onSubmit={handleSubmit}>Register</CustomButton>
      </Form>
    );
  }
}

const errorStyle = {
  color: '#CE2323'
};

RegisterForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
};

// decorator
export default RegisterForm = reduxForm({
  form: 'register',                           // a unique name for this form
  fields: ['login', 'email', 'password', 'passwordCheck'], // all the fields in your form
  validate: validateRegisterForm
})(RegisterForm);
