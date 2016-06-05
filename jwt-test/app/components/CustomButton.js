import React from 'react';
import { Button } from 'react-bootstrap';

class CustomButton extends Button { 

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button style={buttonStyle}
              {...this.props}
              >
        {this.props.children}
      </Button>
    );
  }
}

const buttonStyle = {
  background: '#091B1B',
  color: '#DDDDDD'
};

export default CustomButton;
