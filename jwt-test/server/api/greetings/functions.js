import { db } from '../db';

export function addGreeting(userId, greeting) {
  return db.any('INSERT INTO greetings(user_id, greeting)\
                 VALUES ($1, $2) RETURNING id', [userId, greeting]);
}
