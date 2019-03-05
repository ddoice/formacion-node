var http = require('http');

http.createServer(function (req, res) {

  switch (req.url) {
    case '/ping':
      res.write('pong');
      break;
    case '/test':
      res.write('works!');
      break;
    default:
      res.statusCode = 401;
      res.write('not found');
  }
  res.end();
}).listen(8081);