import HttpStatus from '../utils/httpStatus.js';

export const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER;
  const message = err.message || 'Something went wrong';

  if (err.code === 11000) {
    return res.status(HttpStatus.CONFLICT).json({
      status: 'error',
      message: 'Duplicate field value entered',
    });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: 'error',
      message: errors.join(', '),
    });
  }

  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
