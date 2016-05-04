import express from 'express';

import auth from '../middleware/auth';
import { addGreeting, getRandomGreeting } from './functions';

const router = express.Router();

// Get random greeting
router.get('/', [auth], (req, res) => {
  let ret = {
    greeting: 'No greetings available. Add some to fill our database!'
  };

  getRandomGreeting()
  .then((greeting) => {
    if (greeting.length) {
      ret.greeting = greeting[0].greeting;
    }
    return res.status(200).json(ret);
  })
  .catch(() => {
    return res.status(500).json({});
  });
});

// Add greeting
router.post('/', [auth], (req, res) => {
  if (!req.body.greeting || (req.body.greeting.trim() === '')) {
    return res.status(400).json({message: 'Greeting cant\' t be empty'});
  }
  const greeting = req.body.greeting.trim();

  addGreeting(req.user, greeting)
  .then((id) => {
    if (!id) {
      return res.status(500).json({});
    }
    return res.status(200).json({});
  })
  .catch(() => {
    res.status(500).json({});
  });
});

export default router;
