import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, { message: '제목은 비워둘 수 없습니다.' }),
  content: z.string().trim().min(1, { message: '내용은 비워둘 수 없습니다.' })
});
