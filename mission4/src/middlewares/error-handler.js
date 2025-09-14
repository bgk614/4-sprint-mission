// middlewares/error-handler.js
import { AppError } from '../utils/app-error.js';
import { ErrorCodes } from '../utils/error-codes.js';
import { mapPrismaError } from '../utils/prisma-error-mapper.js';

export const errorHandler = (err, req, res, _next) => {
  // AppError로 통일
  const mapped = mapPrismaError(err, req.originalUrl);
  const appError =
    mapped instanceof AppError
      ? mapped
      : err instanceof AppError
        ? err
        : new AppError({
            ...ErrorCodes.INTERNAL,
            path: req.originalUrl,
            details: { originalError: err.message, stack: err.stack },
          });

  // 내부 로깅
  console.error({
    code: appError.code,
    message: appError.message,
    path: appError.path,
    details: appError.details,
  });

  // 클라이언트 응답
  res.status(appError.status).json({
    code: appError.code,
    message: appError.message,
    path: appError.path,
  });
};
