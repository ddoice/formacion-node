var http = require('http');

http.createServer(function (req, res) {
  res.write('Works!');
  res.end();
}).listen(8081);