import { z } from 'zod';

/**
 * 댓글 생성 요청 검증 스키마
 *
 * - body.content: 필수, 1~5000자
 * - body.articleId | body.productId: 둘 중 하나 필수
 */
export const createCommentSchema = z.object({
  body: z
    .object({
      content: z.string().min(1).max(5000),
      articleId: z.coerce.number().int().positive().optional(),
      productId: z.coerce.number().int().positive().optional(),
    })
    .refine(
      (data) => data.articleId || data.productId,
      '댓글 대상이 필요합니다. articleId 또는 productId 중 하나를 지정하세요.',
    ),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
