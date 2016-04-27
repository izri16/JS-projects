import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';

import App from './containers/App';
import Users from './containers/Users';
import Dashboard from './containers/Dashboard';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='users' component={Users}/>
  </Route>
);
