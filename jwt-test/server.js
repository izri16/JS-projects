import path from 'path';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s. Open up http://localhost:%s/ \
                  in your browser.', port, port);
  }
});
