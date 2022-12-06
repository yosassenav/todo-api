/**
 *
 * @param err ---> error
 * @param req ---> request
 * @param res ---> response
 * @param next ---> callback
 */
const logError = (err, req, res, next) => {
  console.log("An error has occured");
  console.error(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log("Error handler");
  const { message } = err;

  res.status(500).json({ ok: false, message });
};

module.exports = {
  logError,
  errorHandler,
};
