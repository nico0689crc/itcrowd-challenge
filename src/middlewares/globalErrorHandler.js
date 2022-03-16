const { ErrorResponseParser } = require("../shared");

const globalErrorHandler = (error, req, res) => {
  if (error instanceof ErrorResponseParser) {
    res.status(error.httpStatusCode).json({ errors: error.getResponseBody() });
  }
};

module.exports = globalErrorHandler;
