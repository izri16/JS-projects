import React from 'react';
import {
  Grid,
  Row,
  Col,
  Jumbotron,
  Panel
} from 'react-bootstrap';

import RegisterForm from './RegisterForm';

const Body = ({ handleSubmitRegister, children }) => {
  return (
    <Grid fluid={true} style={containerStyle}>
      <Row>
        <Col md={8}>
          <Jumbotron style={jumbotronStyle}>
            <h1>Welcome!</h1>
            <p>We are looking forward for your greetings.</p>
          </Jumbotron>
          <Col md={4}>
            <Panel header={panelOneTitle} bsStyle='default'>
              Get greetings
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header={panelOneTitle} bsStyle='default'>
              Give greetings
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header={panelOneTitle} bsStyle='default'>
              Get more greetings
            </Panel>
          </Col>
        </Col>
        <Col md={4} style={formStyle}>
          <h2>Don't have accout yet?</h2>
          <RegisterForm onSubmit={handleSubmitRegister} />
        </Col>
      </Row>
      {children}
    </Grid>
  );
};


const panelOneTitle = (
  <h3>Greetings are good</h3>
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
