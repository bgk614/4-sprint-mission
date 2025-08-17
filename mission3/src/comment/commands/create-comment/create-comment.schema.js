import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().trim().min(1, { message: '내용 비워둘 수 없습니다.' })
});
