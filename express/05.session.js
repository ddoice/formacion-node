const express = require('express')
const app = express()
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')

const port = 8081

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// MemoryStore!! dont use in production envs
app.use(session({
  secret: 'piojxfcvmp98q3h4fp834jc',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))


// User login
app.use('/login', (req, res, next) => {
  const { user, password } = Object.keys(req.query).length > 0 ? req.query : req.body;
  if (user, password) {
    req.session.logged = true;
    req.session.count = 0;
    req.session.save();
    res.json({ logged: true })
  } else {
    req.session.logged = false;
    req.session.save();
    res.status(400).json({ logged: false })
  }
  next();
})

app.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.json({ logged: false })
  next();
})

// Get dashboard
app.get('/dashboard', (req, res, next) => {
  console.log('req.session', req.session);
  if (req.session.logged) {
    req.session.count += 1;
    res.json({ sales: [], count: req.session.count })
  } else {
    res.status(401).json({ error: 'User not logged' })
  }
  next();
})


/*
 http://localhost:8081/dashboard
 http://192.168.112.92:8081/login?user=name&password=insecure
*/

app.listen(port, () => console.log(`Express listening on port ${port}!`))