import { z } from 'zod';

export const deleteCommentSchema = z.object({
  commentId: z
    .string()
    .regex(/^\d+$/, { message: 'ID는 숫자여야 합니다.' })
    .transform(Number)
    .refine((commentId) => id > 0, { message: 'ID는 1 이상의 숫자여야 합니다.' })
});
