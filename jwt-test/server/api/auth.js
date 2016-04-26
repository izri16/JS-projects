import jwt from 'jwt-simple';
import app from './server';

function auth(req, res, next) {
  const token = (req.body && req.body.access_token) || 
              (req.query && req.query.access_token) ||
              req.headers['x-access-token'];

  if (token) {
    try {
      const decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      req.user = decoded.id;
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
}

export default auth;
