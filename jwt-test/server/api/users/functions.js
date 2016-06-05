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

export function getUserHash(email) {
  const query = 'SELECT u.password as hash, u.id \
                 FROM users u \
                 WHERE u.email=$1 and u.active = true';
  return db.any(query, [email])
    .then((data) => {
      if (data.length) {
        const hash = data[0].hash;
        const id = data[0].id;
        return {hash, userId: id};
      }
      return undefined;
    })
    .then((hash) => {
      return hash;
    });
}

export function getTokenData(userId) {
  console.log('userId', userId);
  const expires = moment().add(7, 'days').valueOf();
  const token = jwt.encode({
    iss: userId,
    exp: expires
  }, app.get('jwtTokenSecret'));
  return {token, expires};
}

export function isCorrectRequest(email, hash) {
  return db.any('SELECT id FROM users \
                 WHERE email = $1 AND auth_hash = $2 AND active = false',
                 [email, hash])
  .then((data) => data.length ? data[0].id : false)
  .catch(() => false);
}

export function confirmRegistration(id) {
  return db.any('UPDATE users SET active = true \
                 WHERE id = $1 AND active = false', [id]);
}