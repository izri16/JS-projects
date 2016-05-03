import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from './actions';

function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      user: action.creds
    });
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: ''
    });
  case LOGIN_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  case LOGOUT_REQUEST:
    return Object.assign({}, state, {
      isAuthenticated: false
    });
  case REGISTER_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      user: action.creds
    });
  case REGISTER_SUCCESS:
    return Object.assign({}, state, {
      errorMessage: '',
      registerSuccess: true
    });
  case REGISTER_FAILURE:
    return Object.assign({}, state, {
      errorMessage: action.message,
      registerSuccess: false
    });
  default:
    return state;
  }
}

const loginApp = combineReducers({
  auth,
  form: formReducer
});

export default loginApp;
