import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import CustomError from '../utils/custom-error.js';

const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      return new CustomError(`Duplicate field value: ${err.meta.target}`, 400);
    case 'P2014':
      return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
    case 'P2003':
      return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
    default:
      return new CustomError(`Something went wrong: ${err.message}`, 500);
  }
};

const handleJWTError = () => new CustomError('Invalid token, please login again', 400);
const handleJWTExpiredError = () => new CustomError('Token has expired, please login again', 400);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      errors: err,
    });
  } else {
    res.status(err.statusCode).render('error', { title: 'Something went wrong!', msg: err.message });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) return res.status(err.statusCode).json({ status: err.status, message: err.message });

    console.error('ERROR 💥', err);
    return res.status(500).json({ status: 'error', message: 'Please try again later' });
  }

  if (err.isOperational) return res.status(err.statusCode).json({ status: err.status, message: err.message });

  return res.status(500).json({ status: 'error', message: 'Something went wrong' });
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = err;

    if (err instanceof PrismaClientKnownRequestError) {
      const newError = handlePrismaError(err);
      newError.stack = err.stack;
      error = newError;
    } else if (error.name === 'JsonWebTokenError') {
      const newError = handleJWTError();
      newError.stack = err.stack;
      error = newError;
    } else if (error.name === 'TokenExpiredError') {
      const newError = handleJWTExpiredError();
      newError.stack = err.stack;
      error = newError;
    }

    sendErrorProd(error, req, res);
  }
};

export default errorHandler;
