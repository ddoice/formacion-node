const express = require('express')
const app = express()
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')

const port = 8081

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Order matters! next() it's a must!
app.use(async (req, res, next) => {
  req.on('end', function () {
    console.log({res,req})
  });
  next();
});

// Order matters! next() it's a must!
app.post('/user', (req, res, next) => {
  console.log(req.body);
  res.json(req.body)
  next();
})


// bodyparser doenst emits 'end' event
app.use(async (req, res, next) => {
  if(['POST','PUT'].includes(req.method) && req._body) {
    req.emit('end')
  }
  next();
});


/*

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  http://localhost:8081/user

*/

// nodemon, debug

app.listen(port, () => console.log(`Express listening on port ${port}!`))