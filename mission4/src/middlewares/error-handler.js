// middlewares/error-handler.js
import { AppError } from '../utils/app-error.js';
import { ErrorCodes } from '../utils/error-codes.js';
import { mapPrismaError } from '../utils/prisma-error-mapper.js';

export const errorHandler = (err, req, res, _next) => {
  // Prisma 에러 → AppError 변환
  const mapped = mapPrismaError(err, req.originalUrl);

  // AppError가 아니면 Internal Server Error로 변환
  const appError =
    mapped instanceof AppError
      ? mapped
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
  return res.status(appError.status).json({
    code: appError.code,
    message: appError.message,
    path: appError.path,
  });
};
