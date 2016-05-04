import jwt from 'jwt-simple';

import app from '../server';
import { db } from '../db';

function auth(req, res, next) {
  req.user = undefined;
  const token = req.headers['x-access-token'];

  if (token) {
    try {
      const decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      const id = decoded.iss;

      if (decoded.exp <= Date.now()) {
        return res.end('Access token has expired', 400);
      }
      
      verifyUser(id)
      .then((status) => {
        if (status) {
          req.user = id;
          next();
        } else {
          res.status(401).json({});
        }
      })
      .catch(() => {
        res.status(500).json({});
      });
    } catch (err) {
      res.status(500).json({});
    }
  } else {
    res.status(401).json({});
  }
}

function verifyUser(id) {
  return db.any('SELECT id FROM users WHERE id = $1 and active = true', [id])
    .then((data) => {
      return data.length ? true : false;
    })
    .catch(() => {
      return false;
    });
}

export default auth;
