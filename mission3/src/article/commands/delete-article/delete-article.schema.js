import { z } from 'zod';

export const deleteArticleSchema = z.object({
  articleId: z
    .string()
    .regex(/^\d+$/, { message: 'ID는 숫자여야 합니다.' })
    .transform(Number)
    .refine((articleId) => commentId > 0, { message: 'ID는 1 이상의 숫자여야 합니다.' }),
});
