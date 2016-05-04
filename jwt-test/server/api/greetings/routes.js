import express from 'express';

import auth from '../../middleware/auth';
import { addGreeting, getRandomGreeting } from './functions';

const router = express.Router();

// Get random greeting
router.get('/', [auth], (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  let ret = {
    greeting: 'No greeting available. Add some to fill our database!'
  };

  getRandomGreeting()
  .then((greeting) => {
    if (greeting.length) {
      ret.greeting = greeting[0].greeting;
    }
    return res.status(200).json(ret);
  })
  .catch(() => {
    return res.sendStatus(500);
  });
});

// Add greeting
router.post('/', [auth], (req, res) => {
  if (!req.body.greeting || (req.body.greeting.trim() === '')) {
    return res.sendStatus(400);
  }
  const greeting = req.body.greeting.trim();
  addGreeting(req.user, greeting)
  .then((id) => {
    if (!id) {
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  })
  .catch(() => {
    res.sendStatus(500);
  });
});

export default router;
