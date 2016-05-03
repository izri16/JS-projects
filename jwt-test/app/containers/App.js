import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';

import Navigation from '../components/Navigation';
import { loginUser, logout } from '../actions';

class App extends Component {

  handleSubmitLogin(data) {
    console.log('Submission received!', data);
    return this.props.loginUser(data).then(() => {
      this.props.dispatch(initialize('login',
      {}, ['email', 'password']));
      this.props.history.push('/dashboard');
    });
  }

  render() {
    console.log('token', localStorage.getItem('id_token'));

    return (
      <div>
        <Navigation
          handleSubmitLogin={this.handleSubmitLogin.bind(this)}
          authenticated={this.props.authenticated}
          logout={() => this.props.logout(this.props.history)} />
        {this.props.children}
      </div>
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
    loginUser,
    logout,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

