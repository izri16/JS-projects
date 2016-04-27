import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

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
  login,
  form: formReducer
});

export default loginApp;
