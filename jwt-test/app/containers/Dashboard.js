import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';

import { getGreeting } from '../actions';
import GreetingForm from '../components/GreetingForm';
import Greeting from '../components/Greeting';

const dashboardStyle = {
  marginTop: '20px',
  paddingBottom: '20px',
  borderRadius: '5px',
  background: 'white'
};

class Dashboard extends Component {
  render() {
    const { getGreeting } = this.props;

    return (
      <Grid style={dashboardStyle}>
        <Row>
          <Col md={6}>
            <h1>Get greeting! Give greeting!</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={{marginTop: '25px'}}>
            <Greeting getGreeting={getGreeting} />
          </Col>
          <Col md={6}>
            <GreetingForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return bindActionCreators({
    getGreeting
  }, dispatch);
};

export default connect(null, mapDispathToProps)(Dashboard);
