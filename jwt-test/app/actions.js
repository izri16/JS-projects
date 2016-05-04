export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const GET_GREETING_REQUEST = 'GET_GREETING_REQUEST';
export const GET_GREETING_SUCCESS = 'GET_GREETING_SUCCESS';
export const GET_GREETING_ERROR = 'GET_GREETING_ERROR';

export const POST_GREETING_REQUEST = 'POST_GREETING_REQUEST';
export const POST_GREETING_SUCCESS = 'POST_GREETING_SUCCESS';
export const POST_GREETING_ERROR = 'POST_GREETING_ERROR';
export const POST_GREETING_AGAIN = 'POST_GREETING_AGAIN';

export const UNEXPECTED_ERROR = 'Unexpected error has occured.';

const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
};

const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
};

export const loginUser = (creds) => {

  let config = {
    method: 'POST',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    body: `email=${creds.email}&password=${creds.password}`,
    mode: 'cors'
  };

  return dispatch => {
    return new Promise((resolve, reject) => {
      // We dispatch requestLogin to kickoff the call to the API
      dispatch(requestLogin(creds));

      return fetch('http://localhost:3001/users', config)
        .then(response =>
          response.json().then(data => ({ data, response })))
        .then(({ data, response }) =>  {
          if (!response.ok) {
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(loginError(data.message));
            reject({_error: data.message});
          } else {
            // If login was successful, set the token in local storage
            localStorage.setItem('id_token', data.token);
            // Dispatch the success action
            dispatch(receiveLogin(data));
            resolve();
          }
        }).catch(err => {
          dispatch(loginError('Error'));
          console.log('Error: ', err);
          reject({_error: 'Unexpected error'});
        });
    });
  };
};


const registerRequest = (creds) => {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false
  };
};

const registerError = (message, errorFields) => {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    message,
    errorFields
  };
};

export const registerUser = (creds) => {
  
  let config = {
    method: 'POST',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    body: `email=${creds.email}&password=${creds.password}&login=${creds.login}`,
    mode: 'cors'
  };
  const ERROR = 'Something went wrong.';

  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(registerRequest(creds));

      return fetch('http://localhost:3001/users/new', config)
        .then(response =>
          response.json().then(res => ({ res, response })))
        .then(({ res, response }) =>  {
          console.info('register', res, response);
          if (!response.ok) {
            dispatch(registerError(res.message, res.errorFields));
            reject({_error: res.message});
          } else {
            dispatch(registerSuccess(res));
            resolve();
          }
        }).catch(err => {
          console.info('register-error', err);
          dispatch(registerError(UNEXPECTED_ERROR));
          reject({_error: ERROR});
        });
    });
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

export const logout = (router) => {
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('id_token');
    router.push('/');
  };
};

const getGreetingRequest = () => {
  return {
    type: GET_GREETING_REQUEST
  };
};

const getGreetingSuccess = (greeting) => {
  return {
    type: GET_GREETING_SUCCESS,
    greeting: greeting
  };
};

const getGreetingError = () => {
  return {
    type: GET_GREETING_ERROR
  };
};

export const getGreeting = () => {
  let config = {
    method: 'GET',
    headers: {'x-access-token': localStorage.getItem('id_token')},
    mode: 'cors'
  };

  return dispatch => {
    dispatch(getGreetingRequest());

    return fetch('http://localhost:3001/greetings', config)
      .then(response =>
        response.json().then(data => ({ data, response })))
      .then(({ data, response }) =>  {
        if (!response.ok) {
          dispatch(getGreetingError(response));
        }
        dispatch(getGreetingSuccess(data.greeting));
      }).catch(err => {
        dispatch(getGreetingError(err));
      });
  };
};

const postGreetingRequest = (greeting) => {
  return {
    type: POST_GREETING_REQUEST,
    greeting: greeting
  };
};

const postGreetingSuccess = () => {
  return {
    type: POST_GREETING_SUCCESS
  };
};

const postGreetingError = (errorMessage) => {
  return {
    type: POST_GREETING_ERROR,
    errorMessage
  };
};

const postGreetingAgain = () => {
  return {
    type: POST_GREETING_AGAIN
  };
};

export const acPostGreetingAgain = () => {
  return dispatch => {
    dispatch(postGreetingAgain());
  };
};

export const postGreeting = (data) => {

  let config = {
    method: 'POST',
    headers: {'x-access-token': localStorage.getItem('id_token'),
              'Content-type': 'application/x-www-form-urlencoded'},
    body: `greeting=${data.greeting}`,
    mode: 'cors'
  };
  const ERROR = 'Something went wrong.';

  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(postGreetingRequest(data.greeting));

      return fetch('http://localhost:3001/greetings', config)
        .then(response => 
          response.json().then(data => ({ data, response })))
        .then(({ data, response }) =>  {
          if (!response.ok) {
            console.log('fffff', response);
            dispatch(postGreetingError(data.message));
            reject({_error: data.message});
          } else {
            dispatch(postGreetingSuccess());
            resolve();
          }
        }).catch(err => {
          console.log('rererererere', err);
          dispatch(postGreetingError(err));
          reject({_error: ERROR});
        });
    });
  };
};

