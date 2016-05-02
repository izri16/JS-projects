import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import address from 'network-address';
import path from 'path';

// check token for every request
import auth from './auth';

// routes
import users from './users/routes';
import mail from './mail/routes';

const env = process.env.NODE_ENV || 'development';
const port = process.env.NODE_PORT || 8001;
const app = express();

// headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth);
app.set('jwtTokenSecret', '78945fewf65f8efarhtjwbnnmju89wre');
app.set('port', port);

// routes
app.use('/users', users);
app.use('/mail', mail);

createServer(app).listen(app.get('port'), () => {
  console.info('Listening on "%s:%s" env="%s"', address(), 
                app.get('port'), env);
});

export default app;
