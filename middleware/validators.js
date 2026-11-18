const makeError = (message, statusCode = 400) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

// Ensures :id is a valid 24-char hex Mongo ObjectId
const validateObjectId = (req, res, next) => {
  if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
    return next(makeError(`Invalid product id: ${req.params.id}`));
  }
  next();
};

// Body must be a non-empty JSON object
const requireBody = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return next(makeError('Request body cannot be empty'));
  }
  next();
};

// Stock adjustment: { "change": 10 } or { "change": -5 }
const validateStockChange = (req, res, next) => {
  const { change } = req.body || {};
  if (typeof change !== 'number' || !Number.isInteger(change) || change === 0) {
    return next(makeError('"change" must be a non-zero integer (positive = restock, negative = sale)'));
  }
  next();
};

module.exports = { validateObjectId, requireBody, validateStockChange, makeError };
