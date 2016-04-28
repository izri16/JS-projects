import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Router, hashHistory} from 'react-router';

import loginApp from './reducers';
import routes from './routes';


function configureStore() {
  const store = createStore(loginApp, {}, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}

let store = configureStore();

let rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>, rootElement
);
