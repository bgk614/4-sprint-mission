import { z } from 'zod';

export const updateCommentSchema = z.object({
  params: z.object({
    commentId: z.string().regex(/^\d+$/, 'commentId는 숫자여야 합니다.'),
  }),
  body: z.object({
    content: z.string().min(1).max(5000),
  }),
  query: z.object({}).optional(),
});
