import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';

import Navigation from '../components/Navigation';
import { loginUser, logout } from '../actions';

class App extends Component {

  handleSubmitLogin(data) {
    return this.props.loginUser(data).then(() => {
      this.props.dispatch(initialize('login',
      {}, ['email', 'password']));
      this.props.history.push('/dashboard');
    });
  }

  render() {
    return (
      <div>
        <Navigation
          handleSubmitLogin={this.handleSubmitLogin.bind(this)}
          authenticated={this.props.authenticated}
          logout={() => this.props.logout(this.context.router)} />
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

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

