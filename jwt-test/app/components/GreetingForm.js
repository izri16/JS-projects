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

class GreetingForm extends Component {

  componentWillMount() {
    this.props.dispatch(initialize('greeting', {
      greeting: ''
    }, ['greeting']));
  }

  render() {
    const {fields: {greeting}, handleSubmit, error} = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId='greeting'>
          <ControlLabel style={labelStyle}>Greeting</ControlLabel>
          {' '}
          <FormControl
            componentClass='textarea'
            placeholder='Type your greeting here ...'
            {...greeting}/>
        </FormGroup>
        {' '}
        <Button onClick={handleSubmit} type='submit' style={buttonStyle}>
          Add greeting
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
  color: '#BE3131',
  textAlign: 'right'
};

GreetingForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
};

// decorator
export default GreetingForm = reduxForm({
  form: 'greeting',                           // a unique name for this form
  fields: ['greeting']                        // all the fields in your form
})(GreetingForm);
