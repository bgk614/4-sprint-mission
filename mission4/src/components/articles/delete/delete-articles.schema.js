import { z } from 'zod';

/**
 * 게시글 삭제 요청 검증 스키마
 *
 * - params.articleId: 숫자 필수
 */
export const deleteArticleSchema = z.object({
  params: z.object({
    articleId: z.coerce.number().int().positive(),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});
