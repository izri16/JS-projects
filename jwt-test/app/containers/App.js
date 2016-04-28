import React, { Component } from 'react';
import { initialize } from 'redux-form';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap'; 
import { connect } from 'react-redux';

import RegisterForm from '../components/RegisterForm';
import NavBar from '../components/NavBar';

import CustomButton from '../components/CustomButton';

class App extends Component {

  handleSubmit(data) {
    console.log('Submission received!', data);
    this.props.dispatch(initialize('register', {}, ['login', 'email', 'password', 'passwordCheck'])); // clear form
  }

  render() {
    return (
        <div>
          <NavBar/>
          <Grid fluid={true} style={containerStyle}>
          <Row>
            <Col md={8}>
              <Jumbotron style={jumbotronStyle}>
                <h1>Welcome!</h1>
                <p>This is a sample text. Wait to see something meaningful.</p>
                <p><CustomButton text={'Wait more'} /></p>
              </Jumbotron>
            </Col>
            <Col md={4}>
              <h2>Registration</h2>
              <RegisterForm onSubmit={this.handleSubmit.bind(this)} />
            </Col>
          </Row>

          {this.props.children}

        </Grid>
      </div>
    );
  }
}

const containerStyle = {
  background: '#A4E3DE',
  height: '100%'
};

const jumbotronStyle = {
  marginTop: '20px'
};

export default connect()(App);
