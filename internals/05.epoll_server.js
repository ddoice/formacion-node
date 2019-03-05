const express = require('express')
const app = express()
const port = 8081

app.get('/', (req, res) => res.send('It works!'))

app.listen(port, () => console.log(`Express listening on port ${port}!`))

/*
var http = require('http');

http.createServer(function (req, res) {
  res.write('Works!');
  res.end();
}).listen(8081);
*/