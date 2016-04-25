import { db } from '../db';

export function isUniqueEmail(email) {
  return db.any('SELECT * FROM users WHERE email=$1', email)
    .then(function (data) {
      console.log('data', data);
      return data.length ? false : true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export function isUniqueLogin(login) {
  return db.any('SELECT * FROM users WHERE login=$1', login)
    .then(function (data) {
      return data.length ? false : true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}
