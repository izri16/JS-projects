import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Jumbotron,
  Panel
} from 'react-bootstrap';

import RegisterForm from './RegisterForm';
import CustomButton from './CustomButton';

class Body extends Component {

  render() {
    const { handleSubmitRegister } = this.props;

    return (
        <Grid fluid={true} style={containerStyle}>
          <Row>
            <Col md={8}>
              <Jumbotron style={jumbotronStyle}>
                <h1>Welcome!</h1>
                <p>This is a sample text. Wait to see something meaningful.</p>
                <p><CustomButton>Show more</CustomButton></p>
              </Jumbotron>
              <Col md={4}>
                <Panel header={panelOneTitle} bsStyle='default'>
                  Panel content
                </Panel>
              </Col>
              <Col md={4}>
                <Panel header={panelOneTitle} bsStyle='default'>
                  Panel content
                </Panel>
              </Col>
              <Col md={4}>
                <Panel header={panelOneTitle} bsStyle='default'>
                  Panel content
                </Panel>
              </Col>
            </Col>
            <Col md={4} style={formStyle}>
              <h2>Don't have accout yet?</h2>
              <RegisterForm onSubmit={handleSubmitRegister} />
            </Col>
          </Row>

          {this.props.children}

        </Grid>
    );
  }
}

const panelOneTitle = (
  <h3>Panel title</h3>
);

const formStyle = {
  background: 'white',
  paddingBottom: '20px',
  marginTop: '20px',
  borderRadius: '5px 0 5px 0'
};

const containerStyle = {
  background: '#EADFDF',
  height: '100%'
};

const jumbotronStyle = {
  marginTop: '20px',
  background: 'white'
};

export default Body;