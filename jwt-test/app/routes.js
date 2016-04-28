import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Users from './containers/Users';
import Dashboard from './containers/Dashboard';

export default (
  <Route path='/' component={App}>
    <Route path='users' component={Users}/>
    <Route path='dashboard' component={Dashboard}/>
    <Route path='*' component={Dashboard}/>
  </Route>
);
