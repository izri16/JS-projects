import { db } from '../db';
import moment from 'moment';
import jwt from 'jwt-simple';
import app from '../server';

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
  const query = 'SELECT u.password as hash, u.id \
                 FROM users u \
                 WHERE u.login=$1 or u.email=$1';
  return db.any(query, [login])
    .then((data) => {
      if (data.length) {
        const hash = data[0].hash;
        const id = data[0].id;
        return {hash, id};
      }
      return undefined;
    })
    .then((hash) => {
      return hash;
    });
}

export function getTokenData(userId) {
  const expires = moment().add(7, 'days').valueOf();
  const token = jwt.encode({
    iss: userId,
    exp: expires
  }, app.get('jwtTokenSecret'));
  return {token, expires};
}