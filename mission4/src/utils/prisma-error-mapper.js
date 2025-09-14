// utils/prisma-error-mapper.js
import { AppError } from './app-error.js';
import { ErrorCodes } from './error-codes.js';

export function mapPrismaError(err, path) {
  if (!err?.code) return err;

  switch (err.code) {
    case 'P2002': {
      const target = err.meta?.target?.[0];
      if (target === 'email') return new AppError({ ...ErrorCodes.EMAIL_IN_USE, path, details: { target } });
      if (target === 'nickname') return new AppError({ ...ErrorCodes.NICKNAME_IN_USE, path, details: { target } });
      return new AppError({ ...ErrorCodes.DB_ERROR, path, details: { prisma: err.meta } });
    }
    case 'P2003':
      return new AppError({ ...ErrorCodes.DB_ERROR, path, details: { prisma: err.meta } });
    case 'P2025':
      return new AppError({ ...ErrorCodes.USER_NOT_FOUND, path, details: { prisma: err.meta } });
    default:
      return err;
  }
}
