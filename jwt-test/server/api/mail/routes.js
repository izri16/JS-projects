import express from 'express';
import nodemailer from 'nodemailer';
import { createHash } from 'crypto';

import { saveAuthHash, isCorrectRequest, confirmRegistration } from './functions';

const router = express.Router();
const authString = 'smtps://publicmailer123%40gmail.com:tajneheslo123@smtp.gmail.com';
const smtpTransport = nodemailer.createTransport(authString);

// send email
router.get('/', (req, res) => {

  const hash = createHash('sha1');
  const host = req.get('host');
  const userId = req.query.id;
  const link = `http://${host}/verify?userId=${userId}&hash=${hash}`;

  const mailOptions={
    to: req.query.to,
    subject: 'Musictor registraion',
    html : 'Hello,<br> Please Click on the link to verify your email.<br>\
            <a href='+link+'>Click here to verify</a>'
  };

  saveAuthHash(userId, hash)
  .then(() => {
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        res.end('error');
      } else {
        console.log('Message sent: ' + response.message);
        res.end('sent');
      }
    });
  })
  .catch(() => {
    res.status(500).end('error');
  });
});

router.get('/verify', (req, res) => {
  console.log(req.protocol + ':/' + req.get('host'));
  const userId = req.query.userId;
  const hash = req.query.id;

  isCorrectRequest(userId, hash)
  .then((data) => {
    if (data) {
      confirmRegistration(userId).
      then(() => {
        res.end('<h1>Email is been Successfully verified');
      });
    }
  })
  .catch(() => {
    res.end('<h1>Bad Request</h1>');
  });
});

export default router;
