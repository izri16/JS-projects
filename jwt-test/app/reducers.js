import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  GET_GREETING_REQUEST, GET_GREETING_SUCCESS, GET_GREETING_ERROR,
  POST_GREETING_REQUEST, POST_GREETING_SUCCESS, POST_GREETING_ERROR, POST_GREETING_AGAIN
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

function greetings(state = {}, action) {
  switch (action.type) {
  case GET_GREETING_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case GET_GREETING_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      greeting: action.greeting,
      errorMessage: ''
    });
  case GET_GREETING_ERROR:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.errorMessage
    });
  case POST_GREETING_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      postGreeting: action.greeting
    });
  case POST_GREETING_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      submitted: true
    });
  case POST_GREETING_ERROR:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.error
    });
  case POST_GREETING_AGAIN:
    return Object.assign({}, state, {
      submitted: false
    });
  default:
    return state;
  }
}

const loginApp = combineReducers({
  auth,
  greetings,
  form: formReducer
});

export default loginApp;
