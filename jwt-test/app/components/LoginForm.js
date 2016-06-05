import React, { Component, PropTypes } from 'react';
import { reduxForm, initialize } from 'redux-form';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock,
  Row,
  Col
} from 'react-bootstrap';

class LoginForm extends Component {

  componentWillMount() {
    this.props.dispatch(initialize('login', {
      email: '',
      password: ''
    }, ['email', 'password']));
  }

  render() {
    const {fields: {email, password}, handleSubmit, error, submitting} = this.props;

    return (
      <div>
      <Row>
      <Form onSubmit={handleSubmit} style={formStyle} inline>
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
        <Button onClick={handleSubmit} type='submit' style={buttonStyle} disabled={submitting}>
          Login
        </Button>
      </Form>
      </Row>
      <Row>
        <Col md={6}>
        </Col>
        <Col md={6}>
        {
          error && <HelpBlock style={errorStyle}>{error}</HelpBlock>
        }
        </Col>
      </Row>
      </div>
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
  color: '#BE3131',
  textAlign: 'right'
};

LoginForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
};

// decorator
export default LoginForm = reduxForm({
  form: 'login',                           // a unique name for this form
  fields: ['email', 'password']            // all the fields in your form
})(LoginForm);
