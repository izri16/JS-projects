import { db } from '../db';

export function isUniqueEmail(email) {
  return db.any('SELECT * FROM users WHERE email=$1', email)
    .then((data) => {
      return data.length ? false : true;
    })
    .catch(() => {
      return false;
    });
}

export function isUniqueLogin(login) {
  return db.any('SELECT * FROM users WHERE login=$1', login)
    .then((data) => {
      return data.length ? false : true;
    })
    .catch(() => {
      return false;
    });
}
