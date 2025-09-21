import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const handlePrismaError = (err: PrismaClientKnownRequestError): AppError => {
  const error: AppError = new Error();
  error.isOperational = true;

  switch (err.code) {
    case 'P2002':
      error.message = `Duplicate field value: ${err.meta?.target}`;
      error.statusCode = 400;
      break;
    case 'P2014':
      error.message = `Invalid ID: ${err.meta?.target}`;
      error.statusCode = 400;
      break;
    case 'P2003':
      error.message = `Invalid input data: ${err.meta?.target}`;
      error.statusCode = 400;
      break;
    default:
      error.message = `Something went wrong: ${err.message}`;
      error.statusCode = 500;
  }

  return error;
};

const handleJWTError = (): AppError => {
  const err: AppError = new Error('Invalid token, please login again');
  err.statusCode = 400;
  err.isOperational = true;
  return err;
};

const handleJWTExpiredError = (): AppError => {
  const err: AppError = new Error('Token has expired, please login again');
  err.statusCode = 400;
  err.isOperational = true;
  return err;
};

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.isOperational = err.isOperational ?? false;

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.isOperational ? 'error' : 'fail',
      message: err.message,
      stack: err.stack,
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({ status: 'error', message: err.message });
    } else {
      console.error('ERROR', err);
      res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
  }
};

export default errorHandler;