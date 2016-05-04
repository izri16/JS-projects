import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';

import { getGreeting, postGreeting, acPostGreetingAgain } from '../actions';
import GreetingForm from '../components/GreetingForm';
import Greeting from '../components/Greeting';

const dashboardStyle = {
  marginTop: '20px',
  paddingBottom: '20px',
  borderRadius: '5px',
  background: 'white'
};

class Dashboard extends Component {

  componentWillMount() {
    if (!this.props.authenticated) {
      this.context.router.push('/');
    }
  }

  handleSubmitGreeting(data) {
    console.log('Submission received!', data);
    return this.props.postGreeting(data).then(() => {
      this.props.dispatch(initialize('greeting',
      {}, ['greeting']));
    });
  }

  render() {
    const { getGreeting, greeting } = this.props;
    console.log('auth', this.props.authenticated);

    return (
      <Grid style={dashboardStyle}>
        <Row>
          <Col md={6}>
            <h1>Get greeting! Give greeting!</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={{marginTop: '25px'}}>
            <Greeting getGreeting={getGreeting} greeting={greeting}/>
          </Col>
          <Col md={6}>
            <GreetingForm submitted={this.props.submitted}
                          onSubmit={this.handleSubmitGreeting.bind(this)}
                          postAgain={this.props.postGreetingAgain} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return bindActionCreators({
    getGreeting,
    postGreeting,
    postGreetingAgain: acPostGreetingAgain,
    dispatch
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    greeting: state.greetings.greeting,
    submitted: state.greetings.submitted,
    authenticated: state.auth.isAuthenticated
  };
};

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispathToProps)(Dashboard);
