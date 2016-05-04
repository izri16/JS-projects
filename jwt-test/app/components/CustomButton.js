import React from 'react';
import { Button } from 'react-bootstrap';

class CustomButton extends Button { 

  constructor(props) {
    super(props);

    this.type = (props.type === 'submit') ? 'submit' : 'button';
    this.onClick = props.onClick ? props.onClick : undefined;
  }

  render() {
    return (
      <Button style={buttonStyle}
              onClick={this.onClick}
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
