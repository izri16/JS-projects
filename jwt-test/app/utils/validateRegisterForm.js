import validator from 'validator';

const NOT_EMPTY = 'Field can\'t be empty';

function validateRegisterForm(data) {

  const errors = {
    login: {},
    email: {},
    password: {},
    passwordCheck: {}
  };

  if (!data.login) {
    errors.login.message = NOT_EMPTY;
  } else if (!validator.isLength(data.login.trim(), {min:6, max:40})) {
    errors.login.message = 'Login must be between 6 to 40 characters';
  }

  if (!data.email) {
    errors.email.message = NOT_EMPTY;
  } else if (!validator.isEmail(data.email.trim())) {
    errors.email.message = 'Incorrect email';
  }

  if (!data.password) {
    errors.password.message = NOT_EMPTY;
  } else if (!validator.isLength(data.password.trim(), {min:6, max:128})) {
    errors.password.message = 'Password must be between 6 to 40 characters';
  }

  if (!data.passwordCheck) {
    errors.passwordCheck.message = NOT_EMPTY;
  } else if (data.password && data.password.trim() !== data.passwordCheck.trim()) {
    errors.passwordCheck.message = 'Passwords do not match';
  }

  return errors;
}

export default validateRegisterForm;
