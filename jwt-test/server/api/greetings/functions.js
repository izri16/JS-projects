import { db } from '../db';

export function addGreeting(userId, greeting) {
  return db.any('INSERT INTO greetings(user_id, greeting)\
                 VALUES ($1, $2) RETURNING id', [userId, greeting]);
}

export function getRandomGreeting() {
  return db.any('SELECT greeting FROM greetings \
                 ORDER BY RANDOM() LIMIT 1');
}
