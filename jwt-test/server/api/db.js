import dotenv from 'dotenv';

dotenv.config();

const options = {};
const pgp = require('pg-promise')(options);

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};
export const db = pgp(cn);

export const connectionTest = function(db) {
  db.connect()
    .then((obj) => {
      obj.done(); // success, release connection;
    })
    .catch((error) => {
      console.info('ERROR:', error.message || error);
    });
};
