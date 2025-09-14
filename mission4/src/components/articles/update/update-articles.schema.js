import { z } from 'zod';

/**
 * 게시글 수정 요청 검증 스키마
 *
 * - params.articleId: 숫자 필수
 * - body.title: 문자열, 최소 1자
 * - body.content: 문자열, 최소 1자
 */
export const updateArticleSchema = z.object({
  params: z.object({
    articleId: z.coerce.number().int().positive(),
  }),
  body: z.object({
    title: z.string().min(1, '제목은 필수입니다.'),
    content: z.string().min(1, '내용은 필수입니다.'),
  }),
  query: z.object({}).optional(),
});
