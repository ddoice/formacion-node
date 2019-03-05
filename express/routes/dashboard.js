const express = require('express');
const router = express.Router();

const schemas = require('../modules/schemas')
const { validate } = require('../modules/helpers')

module.exports = (redis) => {

  router.get('/:day?', validate(schemas.dashboard.main), (req, res, next) => {
    const { day } = res._safeData;
    req.session.count += 1;
    res.json({ sales: [], count: req.session.count, day })
    next();
  })

  return router;

}