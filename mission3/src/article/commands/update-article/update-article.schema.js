import { z } from 'zod';

export const updateArticleSchema = z
  .object({
    titme: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1).optional()
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: '업데이트할 필드가 최소 1개 필요합니다.'
  });
