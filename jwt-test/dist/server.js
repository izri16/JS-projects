'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;

app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

app.get('*', function response(req, res) {
  res.sendFile(_path2.default.join(__dirname, '../public/index.html'));
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s. Open up http://localhost:%s/ \
                  in your browser.', port, port);
  }
});
//# sourceMappingURL=server.js.map
