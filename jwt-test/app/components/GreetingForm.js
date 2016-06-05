import React, { Component, PropTypes } from 'react';
import { reduxForm, initialize } from 'redux-form';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';

class GreetingForm extends Component {

  componentWillMount() {
    this.props.dispatch(initialize('greeting', {
      greeting: ''
    }, ['greeting']));
  }

  render() {
    const {fields: {greeting}, handleSubmit, postAgain, error, submitted, submitting} = this.props;

    return (
      <div>
        {!submitted &&
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
          {
            error && <h4 style={errorStyle}>{error}</h4>
          }
          <Button onClick={handleSubmit} type='submit' disabled={submitting}>
            Add greeting
          </Button>
        </Form>
        ||
        <Button onClick={postAgain} style={againStyle}>Want submit again?</Button>
       }
     </div>
    );
  }
}

const labelStyle = {
  color: '#BBBBBB'
};

const errorStyle = {
  color: '#BE3131'
};

const againStyle = {
  marginTop: '35px'
};

GreetingForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired
};

// decorator
export default GreetingForm = reduxForm({
  form: 'greeting',                           // a unique name for this form
  fields: ['greeting']                        // all the fields in your form
})(GreetingForm);
