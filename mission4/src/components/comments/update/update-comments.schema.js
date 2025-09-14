import { z } from 'zod';

export const updateCommentSchema = z.object({
  params: z.object({
    commentId: z.coerce.number().int().positive(),
  }),
  body: z.object({
    content: z.string().min(1).max(5000),
  }),
});
