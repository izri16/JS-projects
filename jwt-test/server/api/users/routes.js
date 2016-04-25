import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';

import { db, connectionTest} from '../db';
import { isUniqueEmail, isUniqueLogin } from './functions';


const router = express.Router();
connectionTest(db);


router.use((req, res, next) => {
  // Token check may come here
  next();
});


// add new user
router.post('/new', function(req, res) {
  const { body } = req;

  if (!body.password || !body.login || !body.email) {
    res.status(400).send('Invalid data');
  }

  const password = body.password.trim();
  const email = body.email.trim();
  const login = body.login.trim();
  let response = {
    message: 'Something went wrong',
    errorFields: []
  };

  if (!validator.isEmail(email)) {
    response.errorFields.push('email'); 
  }
  if (!validator.isLength(login, {min:6, max:40})) {
    response.errorFields.push('login');
  }
  if (!validator.isLength(password, {min:6, max:128})) {
    response.errorFields.push('password');
  }

  if (!response.errorFields.length) {
    isUniqueEmail(email)
    .then((data) => {
      if (!data) {
        response.message = 'Email exists';
        response.errorFields.push('email'); 
      }
      isUniqueLogin(login)
      .then((data) => {
        if (!data) {
          response.message = 'Login exists';
          response.errorFields.push('login'); 
        }
        if (response.errorFields.length) {
          res.status(400).json(JSON.stringify(response));
        } else {
          response.message = 'OK';
          res.status(200).json(JSON.stringify(response));
          saveUser();
        }
      });
    });
  } else {
    res.status(400).json(JSON.stringify(response));
  }

  const saveUser = () => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        res.status(500).json(JSON.stringify(response));
      }
      var query = 'INSERT INTO users(login, email, password)\
                   VALUES($1, $2, $3) RETURNING id';
      db.one(query, [login, email, hash])
        .then(() => {
          response.message = 'OK';
          res.status(200).json(JSON.stringify(response));
        })
        .catch(() => {
          response.message = 'Could not create user';
          res.status(500).json(JSON.stringify(response));
        });
    });
  };

});


export default router;
