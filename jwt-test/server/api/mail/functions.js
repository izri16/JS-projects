import { db } from '../db';

export function saveAuthHash(id, hash) {
  return db.any('UPDATE users SET auth_hash = $1\
                WHERE id = $2', [hash, id]);
}

export function isCorrectRequest(id, hash) {
  return db.any('SELECT login FROM users \
                 WHERE id = $1 and auth_hash = $2', [id, hash])
  .then((data) => data.length ? data[0].login : false)
  .catch(() => false);
}

export function confirmRegistration(id) {
  return db.any('UPDATE users SET active = 1 \
                 WHERE id = $1', [id]);
}
