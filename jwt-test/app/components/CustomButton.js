import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class CustomButton extends Component {
  render() {
    const { text } = this.props;
    return (
      <Button style={buttonStyle}>{text}</Button>
    );
  }
}

const buttonStyle = {
  background: '#091B1B',
  color: '#DDDDDD'
};

export default CustomButton;
