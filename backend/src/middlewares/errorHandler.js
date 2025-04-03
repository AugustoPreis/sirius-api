const { StatusCodes } = require('http-status-codes');
const { RequestError } = require('../utils/RequestError');

function errorHandler(error, _, res, __) {
  const { status, message } = formatError(error);

  res.status(status).json({ message });
}

function formatError(error) {
  if (error instanceof RequestError) {
    return {
      status: error.statusCode,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }

  if (typeof error === 'string') {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.trim(),
    };
  }

  console.log(`Unknown error: ${error}`);

  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Unknown error',
  };
}

module.exports = { errorHandler };