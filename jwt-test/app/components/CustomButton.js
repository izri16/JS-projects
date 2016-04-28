import React from 'react';
import { Button } from 'react-bootstrap';

class CustomButton extends Button { 

  constructor(props) {
    super(props);

    this.type = props.type === 'submit' ? 'submit' : 'button';
  }

  render() {
    return (
      <Button style={buttonStyle}
              type={this.type}>
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
