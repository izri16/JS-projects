import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import Body from '../components/Body';
import Navigation from '../components/Navigation';

class App extends Component {

  handleSubmitRegister(data) {
    console.log('Submission received!', data);
    this.props.dispatch(initialize('register',
      {}, ['login', 'email', 'password', 'passwordCheck'])); // clear form
  }

  render() {
    return (
      <div>
        <Navigation />
        <Body handleSubmitRegister={this.handleSubmitRegister.bind(this)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps)(App);
