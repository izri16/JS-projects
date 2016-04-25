const options = {};
const pgp = require('pg-promise')(options);

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'jwt_auth',
  user: 'rw',
  password: 'password'
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
