import { z } from 'zod';

export const updateCommentSchema = z.object({
  params: z.object({
    commentId: z.coerce.number().int().positive(), // 문자열이라도 숫자로 변환, 정수, 양수 검증
  }),
  body: z.object({
    content: z.string().min(1).max(5000),
  }),
  query: z.object({}).optional(),
});
