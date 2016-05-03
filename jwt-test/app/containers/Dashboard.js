import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getGreetings } from '../actions';

class Dashboard extends Component {
  render() {
    // if not authenticated redirect

    return (
      <div>
      <h2>Welcome to Dashboard</h2>
      <button onClick={this.props.getGreetings}>click</button>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return bindActionCreators({
    getGreetings
  }, dispatch);
};

export default connect(null, mapDispathToProps)(Dashboard);
