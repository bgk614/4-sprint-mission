// src/shared/validate.js
import { AppError } from './AppError.js';

const toAppError = (err) =>
  new AppError('요청 검증 실패', 400, {
    details:
      err.issues?.map((e) => ({ path: e.path, message: e.message })) ?? []
  });

export const validateBody = (schema) => (req, _res, next) => {
  try {
    req.validatedBody = schema.parse(req.body);
    next();
  } catch (err) {
    next(toAppError(err));
  }
};

export const validateParams = (schema) => (req, _res, next) => {
  try {
    req.validatedParams = schema.parse(req.params);
    next();
  } catch (err) {
    next(toAppError(err));
  }
};

export const validateQuery = (schema) => (req, _res, next) => {
  try {
    req.validatedQuery = schema.parse(req.query);
    next();
  } catch (err) {
    next(toAppError(err));
  }
};
