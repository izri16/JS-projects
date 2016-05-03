import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ConfirmRegistration from './components/ConfirmRegistration';
import App from './containers/App';
import Users from './containers/Users';
import Dashboard from './containers/Dashboard';
import WelcomePage from './containers/WelcomePage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route path='confirm-registration' component={ConfirmRegistration}/>
    <Route path='users' component={Users}/>
    <Route path='dashboard' component={Dashboard}/>
    <Route path='*' component={Dashboard}/>
  </Route>
);
