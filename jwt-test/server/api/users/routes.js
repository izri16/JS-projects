import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';

import { db } from '../db';
import { isUniqueEmail, isUniqueLogin, getUserHash } from './functions';
import {
  INVALID_DATA,
  OK,
  DEFAULT_MESSAGE,
  VALUE_EXISTS
} from '../responses';

const CREATE_USER_ERROR = 'Could not create user';
const WRONG_CREDS = 'Wrong login or password';
const router = express.Router();

// Token check may come here
router.use((req, res, next) => {
  next();
});


// Login
router.post('/', (req, res) => {
  const { body } = req;
  if (!body.password || !body.login) {
    res.status(401).send(WRONG_CREDS);
  }

  const password = body.password.trim();
  const login = body.login.trim();
  getUserHash(login)
    .then((hash) => {
      if (hash) {
        bcrypt.compare(password, hash, (err, match) => {
          if (match) {
            res.status(200).send(OK);
          } else {
            res.status(401).send(WRONG_CREDS);
          }
        })
      } else {
        res.status(401).send(WRONG_CREDS);
      }
    })
    .catch((e) => {
      res.status(500).send(DEFAULT_MESSAGE);
    })
});


// Add new user
router.post('/new', (req, res) => {
  const { body } = req;
  if (!body.password || !body.login || !body.email) {
    response.message = INVALID_DATA
    res.status(400).send(response);
  }

  const password = body.password.trim();
  const email = body.email.trim();
  const login = body.login.trim();
  let response = {
    message: DEFAULT_MESSAGE,
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
        response.errorFields.push('email'); 
      }
      return isUniqueLogin(login);
    })
    .then((data) => {
      if (!data) {
        response.errorFields.push('login'); 
      }
      if (response.errorFields.length) {
        response.message = VALUE_EXISTS;
        res.status(409).json(JSON.stringify(response));
      } else {
        response.message = OK;
        res.status(200).json(JSON.stringify(response));
        saveUser();
      }
    })
    .catch((e) => {
      res.status(500).send(JSON.stringify(response));
    });
  } else {
    response.message = INVALID_DATA;
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
          response.message = OK;
          res.status(200).json(JSON.stringify(response));
        })
        .catch(() => {
          response.message = CREATE_USER_ERROR;
          res.status(500).json(JSON.stringify(response));
        });
    });
  };
});

export default router;
