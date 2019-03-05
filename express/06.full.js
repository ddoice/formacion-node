const express = require('express')
const app = express()
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')
var RedisStore = require('connect-redis')(session);

const user = require('./routes/user')('redis')
const dashboard = require('./routes/dashboard')('redis')
const port = 8081

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(session({
  store: new RedisStore({ host: '192.168.112.92', port: '6379' }),
  secret: 'zSZp4bVMBX3nytqVX4df2H2m85cvdBeGt83zTMwYXLBKy5TKrKNZJfYMJSbF9fwA',
  resave: false,
  saveUninitialized: true,
}))

app.use('/user', (req, res, next) => {
  user(req, res, next);
});

// Middleware session control
app.use((req, res, next) => {
  if (req.session.logged) {
    next();
  } else {
    res.status(401).json({ error: 'User not logged' })
  }
});

// User login
app.use('/dashboard', (req, res, next) => {
  dashboard(req, res, next);
});

/*
 http://localhost:8081/dashboard
 http://192.168.112.92:8081/login?user=name&password=insecure
 // Diff
*/

app.listen(port, () => console.log(`Express listening on port ${port}!`))