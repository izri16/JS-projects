import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';

import Body from '../components/Body';

import { registerUser, loginUser } from '../actions';

class WelcomePage extends Component {

  componentWillMount() {
    if (this.props.authenticated) {
      this.context.router.push('/dashboard');
    }
  }

  handleSubmitRegister(data) {
    console.log('Submission received!', data);
    return this.props.registerUser(data).then(() => {
      this.props.dispatch(initialize('register',
      {}, ['login', 'email', 'password', 'passwordCheck']));
      this.props.history.push('/confirm-registration');
    });
  }

  render() {
    return (
      <Body handleSubmitRegister={this.handleSubmitRegister.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    registerUser,
    loginUser,
    dispatch
  }, dispatch);
};

WelcomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
