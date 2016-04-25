import { db } from '../db';
import bcrypt from 'bcrypt';

export function isUniqueEmail(email) {
  return db.any('SELECT * FROM users WHERE email=$1', [email])
    .then((data) => {
      return data.length ? false : true;
    })
    .catch(() => {
      return false;
    });
}

export function isUniqueLogin(login) {
  return db.any('SELECT * FROM users WHERE login=$1', [login])
    .then((data) => {
      return data.length ? false : true;
    })
    .catch(() => {
      return false;
    });
}

export function getUserHash(login) {
  const query = 'SELECT password as hash \
                 FROM users u \
                 WHERE u.login=$1 or u.email=$1';
  return db.any(query, [login])
    .then((data) => {
      return data.length ? data[0].hash : undefined;
    })
    .then((hash) => {
      return hash;
    })
}
