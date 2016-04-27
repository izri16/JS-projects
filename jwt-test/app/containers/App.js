import React, { Component } from 'react';
import { Link } from 'react-router';
import { initialize } from 'redux-form';
import { Grid, Row, Col, PageHeader, Jumbotron, Button } from 'react-bootstrap'; 

import RegisterForm from '../components/RegisterForm';


class App extends Component {

  handleSubmit(data) {
    console.log('Submission received!', data);
    this.props.dispatch(initialize('register', {})); // clear form
  }

  render() {
    return (
      <Grid fluid={true}>
        <PageHeader>
          Login example<small> We are happy to meat you</small>
        </PageHeader>
        <Row>
          <Col md={8}>
            <Jumbotron>
              <h1>Welcome!</h1>
              <p>This is a sample text. Wait to see something meaningful.</p>
              <p><Button bsStyle='primary'>Wait more</Button></p>
            </Jumbotron>
          </Col>
          <Col md={4}>
            <h2>Registration</h2>
            <RegisterForm onSubmit={this.handleSubmit.bind(this)} />
          </Col>
        </Row>

        {this.props.children}

      </Grid>
    );
  }
}

export default App;
