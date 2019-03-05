const Joi = require('joi');

const safeString = Joi.string().regex(/^[a-zA-Z0-9-_]*$/);

module.exports = {
  user: {
    login: Joi.object().keys({
      user: safeString.min(4).max(50).required(),
      password: Joi.string().min(8).max(50).required()
    })
  },
  dashboard: {
    main: Joi.object().keys({
      day: Joi.date().iso(),
    })
  },
}