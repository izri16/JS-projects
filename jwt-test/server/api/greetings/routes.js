import express from 'express';

import auth from '../../middleware/auth';

const router = express.Router();

// Get custom greeting
router.get('/', [auth], (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    res.status(200).json({ok: 'ok'});
  }
});

router.post('/', [auth], (req, res) => {

});

export default router;
