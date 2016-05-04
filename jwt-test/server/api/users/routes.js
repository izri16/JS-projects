import express from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';
import { createHash } from 'crypto';

import { db } from '../db';
import {
  isUniqueEmail, isUniqueLogin,
  getUserHash, getTokenData,
  isCorrectRequest, confirmRegistration
} from './functions';
import {
  INVALID_DATA,
  OK,
  DEFAULT_MESSAGE,
  FORBIDDEN
} from '../responses';
import app from '../server';

const authString = 'smtps://publicmailer123%40gmail.com:tajneheslo123@smtp.gmail.com';
const smtpTransport = nodemailer.createTransport(authString);

const CREATE_USER_ERROR = 'Could not create user';
const WRONG_CREDS = 'Wrong login or password!';
const router = express.Router();

// Token check may come here
router.use((req, res, next) => {
  next();
});


// Login
router.post('/', (req, res) => {
  const { body } = req;
  let response = {
    message: WRONG_CREDS
  };
  if (!body.password || !body.email) {
    res.status(401).json(response);
  }

  const password = body.password.trim();
  const email = body.email.trim();
  getUserHash(email)
    .then((data) => {
      if (data) {
        const { hash, userId } = data;
        bcrypt.compare(password, hash, (err, match) => {
          if (match) {
            const tokenData = getTokenData(userId);
            response.token = tokenData.token;
            response.expires = tokenData.expires;
            response.message = OK;
            res.status(200).json(response);
          } else {
            res.status(401).json(response);
          }
        });
      } else {
        res.status(401).json(response);
      }
    })
    .catch(() => {
      response.message = DEFAULT_MESSAGE;
      res.status(500).json(response);
    });
});


// Add new user
router.post('/new', (req, res) => {
  const EXISTS = 'EXISTS';
  const { body } = req;
  let response = {
    message: DEFAULT_MESSAGE
  };

  if (!body.password || !body.login || !body.email) {
    response.message = INVALID_DATA;  
    return res.status(400).json(response);
  }

  const password = body.password.trim();
  const email = body.email.trim();
  const login = body.login.trim();

  if (!validator.isEmail(email) || 
      !validator.isLength(login, {min:6, max:40}) ||
      !validator.isLength(password, {min:6, max:128})) {
    response.message = INVALID_DATA;
    return res.status(400).json(response);
  }

  isUniqueEmail(email)
  .then((data) => {
    if (!data) {
      throw {type: EXISTS, message: 'Email exists'};
    }
    return isUniqueLogin(login);
  })
  .then((data) => {
    if (!data) {
      throw {type: EXISTS, message: 'Login exists'};
    }
    saveUser();
  })
  .catch((err) => {
    if (('type' in err) && (err.type === EXISTS)) {
      response.message = err.message;
      res.status(409).json(response);
    } else {
      res.status(500).send(response);
    }
  });

  const saveUser = () => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        return res.status(500).json(response);
      }
      const urlHash = createRandomHash();
      var query = 'INSERT INTO users(login, email, password, auth_hash)\
                   VALUES($1, $2, $3, $4) RETURNING id';
      db.one(query, [login, email, hash, urlHash])
        .then(() => {
          sendVerificationEmail(email, urlHash, login, (emailStatus) => {
            if (emailStatus) {
              response.message = OK;
              res.status(200).json(response);
            } else {
              response.message = 'Could not send email';
              res.status(500).json(response);
            }
          });
        })
        .catch(() => {
          response.message = CREATE_USER_ERROR;
          return res.status(500).json(response);
        });
    });
  };

  const createRandomHash = () => {
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    return createHash('sha1').update(current_date + random).digest('hex');
  };

  const sendVerificationEmail = (email, urlHash, login, fn) => {
    const host = `localhost:${app.get('port')}`;
    const link = `http://${host}/users/verify?email=${email}&hash=${urlHash}`;

    const mailOptions={
      to: email,
      subject: 'Musictor registraion',
      html : 'Thank you for registraion <strong>' + login + '</strong>!<br> \
              Please Click on the link to verify your email.<br>\
              <a href='+link+'>Click here to verify</a>'
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log('Email error', error);
      } else {
        console.log('Email success', response);
      }
      fn(error ? false : true);
    });
  };
});

// verify login
router.get('/verify', (req, res) => {
  if (!req.query.hash || !req.query.email) {
    return res.status(401).end(FORBIDDEN);
  }
  const email = req.query.email;
  const hash = req.query.hash;
  const mainPage = 'http//localhost:3000/home';

  isCorrectRequest(email, hash)
  .then((id) => {
    if (id) {
      confirmRegistration(id)
      .then(() => {
        res.redirect(mainPage);
      })
      .catch(() => {
        res.status(500).end(DEFAULT_MESSAGE);
      });
    } else {
      res.status(401).end(FORBIDDEN);
    }
  })
  .catch(() => {
    res.status(500).end(DEFAULT_MESSAGE);
  });
});

export default router;
