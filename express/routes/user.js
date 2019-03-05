const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas')
const { validate } = require('../modules/helpers')

module.exports = (redis) => {

  router.use('/login', validate(schemas.user.login, 'query'), (req, res, next) => {
    const { user, password } = res._safeData;
    if (user, password) {
      req.session.logged = true;
      req.session.count = 0;
      req.session.save();
      res.redirect('/dashboard')
    } else {
      req.session.logged = false;
      req.session.save();
      res.status(400).json({ logged: false })
    }
    next();
  })

  router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.json({ logged: false })
    next();
  })

  return router;

}
/*

  http://localhost:8081/user/login?user=name&password=insecure
  http://localhost:8081/dashboard

*/