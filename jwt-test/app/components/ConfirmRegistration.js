import React from 'react';
import { Jumbotron, Grid } from 'react-bootstrap';

const ConfirmRegistration = () => {
  return (
    <Grid>
    <Jumbotron style={{marginTop: '20px'}}>
      <h1>Thank you for registration!</h1>
      <p>
        Confirmation email has been sent
        to yout email address.
      </p>
    </Jumbotron>
    </Grid>
  );
};

export default ConfirmRegistration;
