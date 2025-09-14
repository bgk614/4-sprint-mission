// zod 이용해서 req.body, req.param xkdlq cpzm

import { z } from 'zod';

import { ValidationError } from '../../../utils/validation-error.js';

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(10000),
  }),
});

export const validateCreateArticle = (req, res, next) => {
  const parsed = createArticleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError('유효하지 않은 본문', {
      issues: parsed.error.format(),
    });
  }
  res.locals['validated'] = { body: parsed.data };
  next();
};
