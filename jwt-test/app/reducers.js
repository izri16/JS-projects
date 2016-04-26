import { combineReducers } from 'redux';

function login(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
  switch (action.type) {
  default:
    return state;
  }
}

const loginApp = combineReducers({
  login
});

export default loginApp;
