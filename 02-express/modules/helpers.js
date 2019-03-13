const validate = (schema, dataSource) => (req, res, next) => {
  if (!schema) {
    const e = new Error("No valid schema received");
    return next(e);
  }
  // 'params', 'body', 'query'
  const params = !dataSource ? req.params : req[dataSource];
  const valid = schema.validate(params, { abortEarly: false });
  
  if(valid.error) {
    res.status(401).json(valid.error)
  } else {
    res._safeData = params;
    next();
  }
}

module.exports = { validate }

