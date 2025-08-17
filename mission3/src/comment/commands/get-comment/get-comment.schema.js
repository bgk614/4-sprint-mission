import { z } from 'zod';

export const getCommentSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'id는 양의 정수 문자열이어야 합니다.' })
    .transform((v) => Number(v))
    .refine((n) => n > 0, { message: 'id는 1 이상의 정수여야 합니다.' })
});
