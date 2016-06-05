import React from 'react';
import { Button } from 'react-bootstrap';

const CustomButton = (props) => { 
  return (
    <Button style={buttonStyle}
            {...props}
            >
      {props.children}
    </Button>
  );
};

const buttonStyle = {
  background: '#091B1B',
  color: '#DDDDDD'
};

export default CustomButton;
